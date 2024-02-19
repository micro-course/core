import { CourseId, DateTimeISOString, UserId } from "@/kernel";
import { EventData, JSONEventType } from "@eventstore/db-client";
import { CourseAccessGrantReason } from "./projections";

type MetaData = {
  version: 1;
  datetime: DateTimeISOString;
};

export type CourseAccessGrantedEvent = JSONEventType<
  "CourseAccessGranted",
  {
    userId: UserId;
    courseId: CourseId;
    reason: CourseAccessGrantReason;
    adminId?: UserId;
  },
  MetaData
>;

export type CourseAccessRevokedEvent = JSONEventType<
  "CourseAccessRevoked",
  {
    userId: UserId;
    courseId: CourseId;
    reason: "manual";
  },
  MetaData
>;

export type AccessEvent = CourseAccessGrantedEvent | CourseAccessRevokedEvent;

export type AccessEventData = EventData<AccessEvent>;
