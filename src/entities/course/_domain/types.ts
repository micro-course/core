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

export type Course = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail: ImageSrc;
  image: ImageSrc;
  dependencies?: CourseId[];
  product: Product;
};
