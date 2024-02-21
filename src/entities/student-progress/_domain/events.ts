import {
  ContentBlockId,
  CourseId,
  DateTimeISOString,
  LessonId,
} from "@/kernel";
import { EventData, JSONEventType } from "@eventstore/db-client";
import { StudentId } from "./projections";

type EventMeta = {
  version: 1;
  studentId: StudentId;
  datetime: DateTimeISOString;
};

export type CourseEnteredEvent = JSONEventType<
  "CourseEntered",
  {
    courseId: CourseId;
  },
  EventMeta
>;

export type CourseCompletedEvent = JSONEventType<
  "CourseCompleted",
  {
    courseId: CourseId;
  },
  EventMeta
>;

export type LessonCompletedEvent = JSONEventType<
  "LessonCompleted",
  {
    courseId: CourseId;
    lessonId: LessonId;
  },
  EventMeta
>;

export type ContentBlockViewedEvent = JSONEventType<
  "ContentBlockViewed",
  {
    courseId: CourseId;
    lessonId: LessonId;
    contentBlockId: ContentBlockId;
  },
  EventMeta
>;

export type ContentBlockCompletedEvent = JSONEventType<
  "ContentBlockCompleted",
  {
    courseId: CourseId;
    lessonId: LessonId;
    contentBlockId: ContentBlockId;
  },
  EventMeta
>;

export type StudentProgressEvent =
  | CourseEnteredEvent
  | CourseCompletedEvent
  | LessonCompletedEvent
  | ContentBlockViewedEvent
  | ContentBlockCompletedEvent;

export type StudentProgressEventData = EventData<StudentProgressEvent>;
