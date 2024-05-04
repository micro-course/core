import {
  ContentBlockId,
  CourseId,
  CourseProduct,
  CourseSlug,
  LessonId,
  LessonSlug,
} from "@/kernel/domain/course";
import { ImageSrc } from "@/shared/lib/image";

export type Product = CourseProduct;

export type Course = CourseFullInfo & {
  id: CourseId;
  slug: CourseSlug;
  product: Product;
};

export type CourseBaseInfo = {
  title: string;
  shortDescription?: string;
  thumbnail: ImageSrc;
  dependencies?: CourseId[];
};

export type CourseFullInfo = CourseBaseInfo & {
  description: string;
  image: ImageSrc;
};

export interface Lesson {
  id: LessonId;
  slug: LessonSlug;
  courseId: CourseId;
  title: string;
  shortDescription?: string;
  blocks: ContentBlock[];
}

export type ContentBlock = TextBlock;

export interface TextBlock {
  id: ContentBlockId;
  type: "text";
  text: string;
}
