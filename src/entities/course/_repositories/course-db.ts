import { Prisma, CourseProduct as DbProduct } from "@prisma/client";
import { dbClient } from "@/shared/lib/db";
import {
  CourseFull,
  CoursePartial,
  CourseProduct,
  UpsertCourseData,
} from "../_domain/course";
import {
  CourseId,
  CourseSlug,
  LessonId,
  LessonSlug,
} from "@/kernel/domain/course";
import { ImgUrl } from "@/kernel/domain/common";
import { Mdx, MdxId } from "@/kernel/domain/mdx";
import { LessonPartial } from "../_domain/lesson";

class CourseDbRepository {
  async getCourses(where?: Prisma.CourseWhereInput) {
    return this.queryPartialCourses(where).then((r) =>
      r.map(this.dbCourseToPartial),
    );
  }

  async getCourse(where: Prisma.CourseWhereUniqueInput) {
    const result = await dbClient.course.findUnique({
      where,
      include: this.fullInclude,
    });

    if (!result) {
      return null;
    }

    return this.dbCourseToFull(result);
  }

  async upsertCourseData({
    slug,
    title,
    thumbnail,
    id,
    image,
  }: UpsertCourseData): Promise<CoursePartial> {
    const result = await dbClient.course.upsert({
      include: this.partialInclude,
      where: {
        id,
      },
      create: {
        id,
        slug,
        title,
        thumbnail,
        image,
        draft: true,
      },
      update: {
        slug,
        title,
        thumbnail,
        image,
      },
    });
    return this.dbCourseToPartial(result);
  }

  async deleteCourse(id: CourseId) {
    return await dbClient.course.delete({
      where: { id },
    });
  }

  private dbCourseToFull(
    data: NotNull<Awaited<ReturnType<typeof this.queryFullCourse>>>,
  ): CourseFull {
    return {
      id: data.id as CourseId,
      slug: data.slug as CourseSlug,
      title: data.title,
      thumbnail: data.thumbnail as ImgUrl,
      image: data.image as ImgUrl,
      landing: (data.landing ?? undefined) as MdxId | undefined,
      draft: data.draft,
      shortDescription: (data.shortDescription ?? undefined) as Mdx | undefined,

      dependencies: data.dependencies.map((dependencies) =>
        this.dbCourseToPartial(dependencies.dependsOn),
      ),
      dependents: data.dependents.map((dependencies) =>
        this.dbCourseToPartial(dependencies.course),
      ),
      product: this.dbProductToCourseProduct(data.product),
      lessons: data.lessons.map(
        (lesson): LessonPartial => ({
          id: lesson.id as LessonId,
          slug: lesson.slug as LessonSlug,
          courseId: lesson.courseId as CourseId,
          title: lesson.title,
          shortDescription: (lesson.shortDescription ?? undefined) as
            | Mdx
            | undefined,
        }),
      ),
    };
  }

  private dbCourseToPartial = (
    data: Awaited<ReturnType<typeof this.queryPartialCourses>>[0],
  ): CoursePartial => {
    return {
      id: data.id as CourseId,
      title: data.title,
      slug: data.slug as CourseSlug,
      thumbnail: data.thumbnail as ImgUrl,
      draft: data.draft,
      product: this.dbProductToCourseProduct(data.product),
    };
  };

  private dbProductToCourseProduct = (
    product: DbProduct | null,
  ): CourseProduct => {
    if (!product) {
      return {
        access: "free",
      };
    }
    if (product.access === "paid") {
      return {
        access: "paid",
        price: product.price ?? 10000,
      };
    }

    return {
      access: "free",
    };
  };

  private partialInclude = { product: true };
  private fullInclude = {
    product: true,
    lessons: true,
    dependents: {
      include: {
        course: { include: this.partialInclude },
      },
    },
    dependencies: {
      include: {
        dependsOn: { include: this.partialInclude },
      },
    },
  };

  private queryPartialCourses(where?: Prisma.CourseWhereInput) {
    return dbClient.course.findMany({
      where,
      include: this.partialInclude,
      orderBy: {id: 'desc'}
    });
  }

  private async queryFullCourse(where: Prisma.CourseWhereUniqueInput) {
    const course = await dbClient.course.findUnique({
      where,
      include: this.fullInclude,
    });

    return course;
  }
}

type NotNull<T> = T extends null ? never : T;

export const courseDbRepository = new CourseDbRepository();
