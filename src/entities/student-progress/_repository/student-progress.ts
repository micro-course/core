import { UserId } from "@/kernel";
import { redis } from "@/shared/lib/redis";
import { STUDENT_PROGRESS_VERSION } from "../_const";
import { eventStoreDb } from "@/shared/lib/event-store";
import {
  START,
  FORWARDS,
  jsonEvent,
  JSONEventOptions,
  StreamNotFoundError,
} from "@eventstore/db-client";
import {
  StudentProgressEvent,
  StudentProgressEventData,
} from "../_domain/events";
import {
  StudentProgress,
  createStudentProgress,
  studentProgressSchema,
} from "../_domain/projections";
import { studentProgressProducer } from "../_domain/producer";
import { DateTime } from "luxon";

export class StudentProgressRepository {
  constructor() {}

  createEvent<T extends StudentProgressEvent["type"]>(
    studentId: UserId,
    type: T,
    data: JSONEventOptions<Extract<StudentProgressEvent, { type: T }>>["data"],
  ) {
    return jsonEvent<StudentProgressEvent>({
      type,
      data,
      metadata: {
        version: 1,
        studentId,
        datetime: DateTime.now().toISO(),
      },
    } as JSONEventOptions<StudentProgressEvent>);
  }

  async applyEvents(studentId: UserId, events: StudentProgressEventData[]) {
    await eventStoreDb.appendToStream(this.getKey(studentId), events);
  }

  async getByStudentId(studentId: UserId): Promise<StudentProgress> {
    const studentProgress = await this.getFromCache(studentId);

    for await (const resolvedEvent of this.readEvents(studentProgress)) {
      const event = resolvedEvent.event;

      if (!event) {
        continue;
      }

      studentProgressProducer.produce(studentProgress, event);
      studentProgress.meta.revision = String(event.revision);
    }

    await this.saveToCache(studentProgress);
    return studentProgress;
  }

  private async getFromCache(studentId: UserId): Promise<StudentProgress> {
    const value = await redis.get(this.getKey(studentId));

    if (value === null) {
      return createStudentProgress(studentId);
    }

    const json = JSON.parse(value);

    // Игнорирование старой версии из кеша
    if (json.meta.version !== STUDENT_PROGRESS_VERSION) {
      return createStudentProgress(studentId);
    }

    const res = await studentProgressSchema.safeParseAsync(json);

    if (!res.success) {
      return createStudentProgress(studentId);
    }

    return res.data;
  }

  private async *readEvents(studentProgress: StudentProgress) {
    const events = eventStoreDb.readStream<StudentProgressEvent>(
      this.getKey(studentProgress.studentId),
      {
        direction: FORWARDS,
        fromRevision:
          studentProgress.meta.revision === START
            ? START
            : BigInt(studentProgress.meta.revision),
      },
    );

    try {
      for await (const resolvedEvent of events) {
        yield resolvedEvent;
      }
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return;
      }

      throw error;
    }
  }

  private async saveToCache(studentProgress: StudentProgress) {
    await redis.set(
      this.getKey(studentProgress.studentId),
      JSON.stringify(studentProgress),
    );
  }

  private getKey(studentId: UserId) {
    return `student-progress-entity-${studentId}`;
  }
}

export const studentProgressRepository = new StudentProgressRepository();
