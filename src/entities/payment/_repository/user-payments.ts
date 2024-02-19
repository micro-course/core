import { UserId } from "@/kernel";
import { redis } from "@/shared/lib/redis";
import { USER_PAYMENTS_VERSION } from "../_const";
import { eventStoreDb } from "@/shared/lib/event-store";
import {
  START,
  FORWARDS,
  jsonEvent,
  JSONEventOptions,
  StreamNotFoundError,
} from "@eventstore/db-client";
import { userPaymentsProducer } from "../_domain/producer";
import { DateTime } from "luxon";
import { PaymentEvent, PaymentEventData } from "../_domain/events";
import {
  UserPayments,
  createUserPayments,
  userPaymentsSchema,
} from "../_domain/projections";

export class UserPaymentsRepository {
  constructor() {}

  createEvent<T extends PaymentEvent["type"]>(
    type: T,
    data: JSONEventOptions<Extract<PaymentEvent, { type: T }>>["data"],
  ) {
    return jsonEvent<PaymentEvent>({
      type,
      data,
      metadata: {
        version: 1,
        datetime: DateTime.now().toISO(),
      },
    } as JSONEventOptions<PaymentEvent>);
  }

  async applyEvents(userId: UserId, events: PaymentEventData[]) {
    await eventStoreDb.appendToStream(this.getKey(userId), events);
  }

  async getUserPayments(userId: UserId): Promise<UserPayments> {
    const userPayments = await this.getFromCache(userId);

    for await (const resolvedEvent of this.readEvents(userPayments)) {
      const event = resolvedEvent.event;

      if (!event) {
        continue;
      }

      userPaymentsProducer.produce(userPayments, event);
      userPayments.meta.revision = String(event.revision);
    }

    await this.saveToCache(userPayments);
    return userPayments;
  }

  private async getFromCache(userId: UserId): Promise<UserPayments> {
    const value = await redis.get(this.getKey(userId));

    if (value === null) {
      return createUserPayments(userId);
    }

    const json = JSON.parse(value);

    // Игнорирование старой версии из кеша
    if (json.meta.version !== USER_PAYMENTS_VERSION) {
      return createUserPayments(userId);
    }

    const res = await userPaymentsSchema.safeParseAsync(json);

    if (!res.success) {
      return createUserPayments(userId);
    }

    return res.data;
  }

  private async *readEvents(userPayments: UserPayments) {
    const events = eventStoreDb.readStream<PaymentEvent>(
      this.getKey(userPayments.userId),
      {
        direction: FORWARDS,
        fromRevision:
          userPayments.meta.revision === START
            ? START
            : BigInt(userPayments.meta.revision) + BigInt(1),
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

  private async saveToCache(userPayments: UserPayments) {
    await redis.set(
      this.getKey(userPayments.userId),
      JSON.stringify(userPayments),
    );
  }

  public getKey(userId: UserId) {
    return `payments-${userId}`;
  }
}

export const userPaymentsRepository = new UserPaymentsRepository();
