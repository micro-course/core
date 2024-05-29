import { $Enums, PrismaClient } from "@prisma/client";
import { ADMIN, USER, USER_2 } from "../tests/stabs/users";
import { eventStoreDb } from "@/shared/lib/event-store";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { ANY } from "@eventstore/db-client";
import { userPaymentsRepository } from "@/entities/payment/payment.server";
import { userAccessRepository } from "@/entities/access/user-access.server";
const prisma = new PrismaClient();

async function main() {
  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      slug: "intro-to-programming",
      title: "Introduction to Programming",
      thumbnail: "thumb_intro_to_programming.jpg",
      image: "img_intro_to_programming.jpg",
      shortDescription: "Learn the basics of programming.",
      draft: false,
      product: {
        create: {
          access: "free",
        },
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      slug: "advanced-programming",
      title: "Advanced Programming",
      thumbnail: "thumb_advanced_programming.jpg",
      image: "img_advanced_programming.jpg",
      shortDescription: "Dive deeper into programming concepts.",
      draft: false,
      product: {
        create: {
          access: "paid",
          price: 10,
        },
      },
    },
  });

  // Create Course Dependencies
  await prisma.courseDependency.create({
    data: {
      courseId: course2.id,
      dependsOnId: course1.id,
    },
  });

  // Create Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      slug: "intro-lesson-1",
      title: "Introduction Lesson 1",
      shortDescription: "First lesson of the introductory course.",
      courseId: course1.id,
      blocks: {
        create: [
          {
            type: "text",
            text: "Welcome to the first lesson!",
          },
        ],
      },
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      slug: "advanced-lesson-1",
      title: "Advanced Lesson 1",
      shortDescription: "First lesson of the advanced course.",
      courseId: course2.id,
      blocks: {
        create: [
          {
            type: "text",
            text: "Welcome to the first advanced lesson!",
          },
        ],
      },
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      id: ADMIN.id,
      email: ADMIN.email,
      role: ADMIN.role,
      name: ADMIN.name,
      emailVerified: new Date().toISOString(),
    },
  });

  const user = await prisma.user.create({
    data: {
      id: USER.id,
      email: USER.email,
      role: USER.role,
      emailVerified: new Date().toISOString(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: USER_2.id,
      email: USER_2.email,
      role: USER_2.role,
      emailVerified: new Date().toISOString(),
    },
  });

  await prisma.mapNode.create({
    data: {
      id: "test-course-1-node",
      x: 100,
      y: 1100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: "test-course-1-node-data",
          courseId: "test-course-1",
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: "test-course-2-node",
      x: 100,
      y: 600,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: "test-course-2-node-data",
          courseId: "test-course-2",
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: "test-course-3-node",
      x: 100,
      y: 100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: "test-course-3-node-data",
          courseId: "test-course-3",
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: "image-node-1",
      x: 500,
      y: 100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      rotation: 30,
      imageData: {
        create: {
          id: "image-node-1-node-data",
          src: "https://crowdbotics.ghost.io/content/images/2021/07/React-Native.png",
        },
      },
    },
  });
  console.log({ adminUser, user, user2 });

  await studentProgressRepository.clearCache(ADMIN.id);
  try {
    Promise.allSettled([
      await eventStoreDb.deleteStream(
        studentProgressRepository.getKey(ADMIN.id),
        {
          expectedRevision: ANY,
        },
      ),
      await eventStoreDb.deleteStream(userPaymentsRepository.getKey(ADMIN.id), {
        expectedRevision: ANY,
      }),
      await eventStoreDb.deleteStream(userAccessRepository.getKey(ADMIN.id), {
        expectedRevision: ANY,
      }),
    ]);
  } catch (e) {
    console.log(e);
  }

  await studentProgressRepository.applyEvents(ADMIN.id, [
    studentProgressRepository.createEvent(ADMIN.id, "CourseEntered", {
      courseId: "test-course-1",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockViewed", {
      courseId: "test-course-1",
      lessonId: "test-course-1_lesson-1",
      contentBlockId: "test-course-1_lesson-1_block-1",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockCompleted", {
      courseId: "test-course-1",
      lessonId: "test-course-1_lesson-1",
      contentBlockId: "test-course-1_lesson-1_block-1",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "CourseEntered", {
      courseId: "test-course-2",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockViewed", {
      courseId: "test-course-2",
      lessonId: "test-course-2_test-lesson",
      contentBlockId: "test-course-2_test-lesson_block-1",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockCompleted", {
      courseId: "test-course-2",
      lessonId: "test-course-2_test-lesson",
      contentBlockId: "test-course-2_test-lesson_block-1",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockViewed", {
      courseId: "test-course-2",
      lessonId: "test-course-2_test-lesson",
      contentBlockId: "test-course-2_test-lesson_block-2",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "ContentBlockCompleted", {
      courseId: "test-course-2",
      lessonId: "test-course-2_test-lesson",
      contentBlockId: "test-course-2_test-lesson_block-2",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "LessonCompleted", {
      courseId: "test-course-2",
      lessonId: "test-course-2_test-lesson",
    }),
    studentProgressRepository.createEvent(ADMIN.id, "CourseCompleted", {
      courseId: "test-course-2",
    }),
  ]);

  console.log(await studentProgressRepository.getByStudentId(ADMIN.id));

  process.exit(0);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
