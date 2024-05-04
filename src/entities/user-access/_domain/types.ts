export type CourseAccessReason = "paid" | "free" | "manual";
export type UserAccessType = "course";

export type CourseUserAccess = {
  id: string;
  type: "course";
  userId: string;
  courseId: string;
  reason: CourseAccessReason;
  adminId?: string;
};

export type UserAccess = CourseUserAccess;
