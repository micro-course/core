import { ImgUrl } from "@/kernel/domain/common";
import {
  CourseDependentId,
  CourseId,
  CourseSlug,
} from "@/kernel/domain/course";
import { Mdx, MdxId } from "@/kernel/domain/mdx";
import { LessonPartial } from "./lesson";

export type CourseProduct =
  | {
      access: "free";
    }
  | {
      access: "paid";
      price: number;
    };

export type CoursePartial = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: ImgUrl;
  shortDescription?: Mdx;
  draft: boolean;
  product: CourseProduct;
};

export type CourseFull = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: ImgUrl;
  image: ImgUrl;
  draft: boolean;
  landing?: MdxId;
  shortDescription?: Mdx;
  shortDescriptionId?: MdxId;
  dependencies: CoursePartial[];
  dependents: CoursePartial[];
  product: CourseProduct;
  lessons: LessonPartial[];
};

export type CourseDependency = {
  id: CourseDependentId;
  courseId: CourseId;
  dependsOnId: CourseId;
};

export type UpsertCourseData = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: ImgUrl;
  image: ImgUrl;
};

export type UpdateCourseDraft = {
  id: CourseId;
  draft: boolean;
};

export type UpdateCourseShortDescription = {
  id: CourseId;
  text: Mdx;
};

export type UpdateCourseLanding = {
  id: CourseId;
  text: Mdx;
};

export type UpdateCourseProduct = {
  id: CourseId;
  product: CourseProduct;
};

export type UpdateCourseDeps = {
  id: CourseId;
  dependencies: CourseDependency[];
};
