import { UserAccess } from "./projections";
import {
  AccessEvent,
  CourseAccessGrantedEvent,
  CourseAccessRevokedEvent,
} from "./events";

export class AccessError extends Error {
  constructor(
    public message: string,
    public payment: UserAccess,
    public event: AccessEvent,
  ) {
    super(message);
  }
}

export class UserAccessProducer {
  constructor() {}

  produce(state: UserAccess, event: AccessEvent) {
    const eventType = event.type;
    switch (event.type) {
      case "CourseAccessGranted":
        this.handleCourseAccessGranted(state, event);
        break;
      case "CourseAccessRevoked":
        this.handleCourseAccessRevoked(state, event);
        break;
      default:
        throw new Error(`Unhandled event type: ${eventType}`);
    }
    return state;
  }

  handleCourseAccessGranted(
    state: UserAccess,
    event: CourseAccessGrantedEvent,
  ) {
    state.byCourseId[event.data.courseId] = {
      userId: event.data.userId,
      courseId: event.data.courseId,
      reason: event.data.reason,
      adminId: event.data.adminId, // Если reason === "manual"
    };
  }

  handleCourseAccessRevoked(
    state: UserAccess,
    event: CourseAccessRevokedEvent,
  ) {
    delete state.byCourseId[event.data.courseId];
  }
}

export const userAccessProducer = new UserAccessProducer();
