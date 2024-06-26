import {
  ContentBlockId,
  CourseId,
  DateTimeISOString,
  LessonId,
} from "@/kernel";
import {
  ContentBlockProgress,
  CourseProgress,
  LessonProgress,
  StudentId,
  StudentProgress,
} from "./projections";
import {
  StudentProgressEvent,
  CourseEnteredEvent,
  CourseCompletedEvent,
  LessonCompletedEvent,
  ContentBlockViewedEvent,
  ContentBlockCompletedEvent,
} from "./events";

export class StudentProgressProducerError extends Error {
  constructor(
    public message: string,
    public progress: StudentProgress,
    public event: StudentProgressEvent,
  ) {
    super("producer error");
  }
}

export class StudentProgressProducer {
  constructor() {}

  produce(state: StudentProgress, event: StudentProgressEvent) {
    const eventType = event.type;
    switch (event.type) {
      case "CourseEntered":
        this.handleCourseEntered(state, event);
        break;
      case "CourseCompleted":
        this.handleCourseCompleted(state, event);
        break;
      case "LessonCompleted":
        this.handleLessonCompleted(state, event);
        break;
      case "ContentBlockViewed":
        this.handleContentBlockViewed(state, event);
        break;
      case "ContentBlockCompleted":
        this.handleContentBlockCompleted(state, event);
        break;
      default:
        throw new Error(`Unhandled event type: ${eventType}`);
    }
    return state;
  }

  handleCourseEntered(state: StudentProgress, event: CourseEnteredEvent) {
    if (state.courses[event.data.courseId]) {
      throw new StudentProgressProducerError(
        "Course already entered",
        state,
        event,
      );
    }

    const now = this.eventDateTime(event);

    state.courses[event.data.courseId] = this.createCourse({
      ...event.data,
      ...event.metadata,
      now,
    });
  }

  handleContentBlockViewed(
    state: StudentProgress,
    event: ContentBlockViewedEvent,
  ) {
    this.checkCourseEntered(state, event);

    const now = this.eventDateTime(event);
    const course = state.courses[event.data.courseId]!;
    const lesson =
      state.lessons[event.data.lessonId] ??
      this.createLesson({
        ...event.data,
        ...event.metadata,
      });
    const contentBlock =
      state.contentBlocks[event.data.contentBlockId] ??
      this.createContentBlock({
        ...event.data,
        ...event.metadata,
      });

    state.lastViewedBlock = {
      ...event.data,
    };

    course.lastViewedBlock = state.lastViewedBlock;
    course.lastInteractionAt = now;

    state.lessons[event.data.lessonId] = lesson;
    state.contentBlocks[event.data.contentBlockId] = contentBlock;
  }

  handleContentBlockCompleted(
    state: StudentProgress,
    event: ContentBlockCompletedEvent,
  ) {
    this.checkCourseEntered(state, event);
    this.checkLessonStarted(state, event);
    this.checkContentBlockStarted(state, event);

    const course = state.courses[event.data.courseId]!;
    const lesson = state.lessons[event.data.lessonId]!;
    const contentBlock = state.contentBlocks[event.data.contentBlockId]!;
    const now = this.eventDateTime(event);

    contentBlock.completedAt = now;
    course.lastInteractionAt = now;
    lesson.completedBlocksCount += 1;
  }

  handleLessonCompleted(state: StudentProgress, event: LessonCompletedEvent) {
    this.checkCourseEntered(state, event);
    this.checkLessonStarted(state, event);

    const course = state.courses[event.data.courseId]!;
    const lesson = state.lessons[event.data.lessonId]!;
    const now = this.eventDateTime(event);

    course.completedLessonsCount += 1;
    course.lastInteractionAt = now;

    lesson.completedAt = now;
  }

  handleCourseCompleted(state: StudentProgress, event: CourseCompletedEvent) {
    this.checkCourseEntered(state, event);

    const courseProgress = state.courses[event.data.courseId]!;
    const now = this.eventDateTime(event);

    courseProgress.completedAt = now;
  }

  private eventDateTime(event: StudentProgressEvent): DateTimeISOString {
    return event.metadata.datetime;
  }

  private createCourse({
    studentId,
    courseId,
    now,
  }: {
    studentId: StudentId;
    courseId: CourseId;
    now: DateTimeISOString;
  }): CourseProgress {
    return {
      courseId: courseId,
      studentId: studentId,
      enteredAt: now,
      lastInteractionAt: now,
      completedLessonsCount: 0,
    };
  }

  private createLesson({
    studentId,
    courseId,
    lessonId,
  }: {
    studentId: StudentId;
    courseId: CourseId;
    lessonId: LessonId;
  }): LessonProgress {
    return {
      courseId: courseId,
      studentId: studentId,
      lessonId: lessonId,
      completedBlocksCount: 0,
    };
  }

  private createContentBlock({
    studentId,
    contentBlockId,
    courseId,
    lessonId,
  }: {
    studentId: StudentId;
    courseId: CourseId;
    lessonId: LessonId;
    contentBlockId: ContentBlockId;
  }): ContentBlockProgress {
    return {
      studentId,
      courseId,
      lessonId,
      contentBlockId,
    };
  }

  private checkCourseEntered(
    state: StudentProgress,
    event: Extract<StudentProgressEvent, { data: { courseId: CourseId } }>,
  ) {
    if (!state.courses[event.data.courseId]) {
      throw new StudentProgressProducerError(
        "Course not enterred",
        state,
        event,
      );
    }
  }

  private checkLessonStarted(
    state: StudentProgress,
    event: Extract<StudentProgressEvent, { data: { lessonId: LessonId } }>,
  ) {
    if (!state.lessons[event.data.lessonId]) {
      throw new StudentProgressProducerError(
        "Course not started",
        state,
        event,
      );
    }
  }

  private checkContentBlockStarted(
    state: StudentProgress,
    event: Extract<
      StudentProgressEvent,
      { data: { contentBlockId: LessonId } }
    >,
  ) {
    if (!state.contentBlocks[event.data.contentBlockId]) {
      throw new StudentProgressProducerError(
        "ContentBlock not started",
        state,
        event,
      );
    }
  }
}

export const studentProgressProducer = new StudentProgressProducer();
