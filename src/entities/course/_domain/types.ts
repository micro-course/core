import { CourseId, CourseSlug, LessonId } from "@/kernel/domain/course";
import { ImageSrc } from "@/shared/lib/image";

export type Product =
  | {
      access: "free";
    }
  | {
      access: "paid";
      price: number;
    };

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
