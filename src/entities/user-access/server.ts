import { ContainerModule } from "inversify";
import { GrandCourseAccessService } from "./_services/grand-course-access";
import { CheckCourseAccessService } from "./_services/check-course-access";
import { UserAccessRepository } from "./_repository/user-access";

export const UserAccessModule = new ContainerModule((bind) => {
  bind(UserAccessRepository).toSelf();
  bind(CheckCourseAccessService).toSelf();
  bind(GrandCourseAccessService).toSelf();
});

export { CheckCourseAccessService, GrandCourseAccessService };
