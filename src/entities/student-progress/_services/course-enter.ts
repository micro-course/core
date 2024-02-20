import { CourseId } from "@/kernel";
import { StudentId } from "../_domain/projections";
import { studentProgressRepository } from "../student-progress.server";
import { studentProgressProducer } from "../student-progress";

type Command = {
  studentId: StudentId;
  courseId: CourseId;
};

export class CourseEnterService {
  constructor() {}

  async exec({ studentId, courseId }: Command) {
    const studentProgress =
      await studentProgressRepository.getByStudentId(studentId);

    const createPaymentEvent = studentProgressRepository.createEvent(
      studentId,
      "CourseEntered",
      {
        courseId,
      },
    );

    studentProgressProducer.produce(studentProgress, createPaymentEvent);

    const courseProgress = studentProgress.courses[courseId];

    if (!courseProgress) {
      throw new Error("Enter course access error");
    }

    await studentProgressRepository.applyEvents(studentId, [
      createPaymentEvent,
    ]);

    return { studentProgress };
  }
}

export const courseEnterService = new CourseEnterService();
