import { UserId } from "@/kernel";
import { redis } from "@/shared/lib/redis";
import { USER_COURSE_ACCESS_VERSION } from "../_const";
import { eventStoreDb } from "@/shared/lib/event-store";
import {
  START,
  FORWARDS,
  jsonEvent,
  JSONEventOptions,
  StreamNotFoundError,
} from "@eventstore/db-client";
import { DateTime } from "luxon";
import {
  UserAccess,
  userAccess,
  userAccessSchema,
} from "../_domain/projections";
import { AccessEvent, AccessEventData } from "../_domain/events";
import { userAccessProducer } from "../_domain/producer";

export class UserAccessRepository {
  constructor() {}

  createEvent<T extends AccessEvent["type"]>(
    type: T,
    data: JSONEventOptions<Extract<AccessEvent, { type: T }>>["data"],
  ) {
    return jsonEvent<AccessEvent>({
      type,
      data,
      metadata: {
        version: 1,
        datetime: DateTime.now().toISO(),
      },
    } as JSONEventOptions<AccessEvent>);
  }

  async applyEvents(userId: UserId, events: AccessEventData[]) {
    await eventStoreDb.appendToStream(this.getKey(userId), events);
  }

  async getUserAccesss(userId: UserId): Promise<UserAccess> {
    const userAccesss = await this.getFromCache(userId);

    for await (const resolvedEvent of this.readEvents(userAccesss)) {
      const event = resolvedEvent.event;

      if (!event) {
        continue;
      }

      userAccessProducer.produce(userAccesss, event);
      userAccesss.meta.revision = String(event.revision);
    }

    await this.saveToCache(userAccesss);
    return userAccesss;
  }

  private async getFromCache(userId: UserId): Promise<UserAccess> {
    const value = await redis.get(this.getKey(userId));

    if (value === null) {
      return userAccess(userId);
    }

    const json = JSON.parse(value);

    // Игнорирование старой версии из кеша
    if (json.meta.version !== USER_COURSE_ACCESS_VERSION) {
      return userAccess(userId);
    }

    const res = await userAccessSchema.safeParseAsync(json);

    if (!res.success) {
      return userAccess(userId);
    }

    return res.data;
  }

  private async *readEvents(userAccesss: UserAccess) {
    const events = eventStoreDb.readStream<AccessEvent>(
      this.getKey(userAccesss.userId),
      {
        direction: FORWARDS,
        fromRevision:
          userAccesss.meta.revision === START
            ? START
            : BigInt(userAccesss.meta.revision) + BigInt(1),
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

  clearCache(studentId: UserId) {
    return redis.del(this.getKey(studentId));
  }

  private async saveToCache(userAccesss: UserAccess) {
    await redis.set(
      this.getKey(userAccesss.userId),
      JSON.stringify(userAccesss),
    );
  }

  public getKey(userId: UserId) {
    return `access-${userId}`;
  }
}

export const userAccessRepository = new UserAccessRepository();
