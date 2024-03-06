import { createAdminAbility } from "../_domain/ability";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { userRepository } from "@/entities/user/_repositories/user";
import {
  ProgressStatisticsQuery,
  ProgressStatistics,
  CourseStatistics,
} from "../_domain/types/progress-statistics";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserEntity } from "@/entities/user/user";
import { courseIndexRepository } from "@/entities/course/course.server";
import { UserId } from "@/kernel";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { NotUndefined } from "@/shared/lib/types";

export class GetProgressStatisticsUseCase {
  @checkAbility({
    createAbility: createAdminAbility,
    check: (ability) => ability.canViewProgressStatistics(),
  })
  async exec(
    {}: Partial<WithSession>,
    query: ProgressStatisticsQuery,
  ): Promise<ProgressStatistics> {
    let users: UserEntity[] = [];
    if (query.userId) {
      users = [await userRepository.getUserById(query.userId)];
    } else {
      users = await userRepository.getUsersList();
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
