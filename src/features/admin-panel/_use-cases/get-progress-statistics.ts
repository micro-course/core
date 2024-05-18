import { createAdminAbility } from "../_domain/ability";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import {
  ProgressStatisticsQuery,
  ProgressStatistics,
  CourseStatistics,
} from "../_domain/types/progress-statistics";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { courseIndexRepository } from "@/entities/course/course.server";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { NotUndefined } from "@/shared/lib/types";
import { SharedUser, UserId } from "@/kernel/domain/user";
import { getUserService, getUsersService } from "@/entities/user/server";
import { compact } from "lodash-es";

export class GetProgressStatisticsUseCase {
  @checkAbility({
    createAbility: createAdminAbility,
    check: (ability) => ability.canViewProgressStatistics(),
  })
  async exec(
    {}: Partial<WithSession>,
    query: ProgressStatisticsQuery,
  ): Promise<ProgressStatistics> {
    let users: SharedUser[] = [];
    if (query.userId) {
      users = compact([await getUserService.exec({ userId: query.userId })]);
    } else {
      users = await getUsersService.exec();
    }

    const coursesIndex = await courseIndexRepository.getCoursesIndex();

    const progress: Record<UserId, StudentProgress> = {};

    for (const user of users) {
      progress[user.id] = await studentProgressRepository.getByStudentId(
        user.id,
      );
    }

    const coursesStatistics = coursesIndex.list.map(
      (course): CourseStatistics => {
        const usersStatistics = users.reduce(
          (res, user) => {
            const courseProgress = progress[user.id].courses[course.id];
            if (courseProgress) {
              res.started += 1;
            }
            if (courseProgress?.completedAt) {
              res.completed += 1;
            }
            return res;
          },
          {
            started: 0,
            completed: 0,
          },
        );

        return {
          id: course.id,
          slug: course.slug,
          title: course.title,
          ...usersStatistics,
          lessons: course.lessons
            .map((lessonId) => {
              const lesson = coursesIndex.lessonById[lessonId];
              if (!lesson) {
                return undefined;
              }

              const usersLessonStatistics = users.reduce(
                (res, user) => {
                  const lessonProgress = progress[user.id].lessons[lessonId];
                  if (lessonProgress) {
                    res.started += 1;
                  }
                  if (lessonProgress?.completedAt) {
                    res.completed += 1;
                  }
                  return res;
                },
                {
                  started: 0,
                  completed: 0,
                },
              );

              return {
                id: lesson.id,
                slug: lesson.slug,
                title: lesson.title,
                ...usersLessonStatistics,
              };
            })
            .filter((v): v is NotUndefined<typeof v> => !!v),
        };
      },
    );

    return ProgressStatistics.parse({
      query,
      coursesStatistics,
      allUsers: users,
      allCourses: coursesIndex.list,
    } satisfies ProgressStatistics);
  }
}

export const getProgressStatisticsUseCase = new GetProgressStatisticsUseCase();
