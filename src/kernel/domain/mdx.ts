import { $Enums } from "@prisma/client";
import { z } from "zod";
import { ContentBlockId, CourseId, LessonId } from "./course";

export const MdxId = z.string().brand("MdxId");
export type MdxId = z.infer<typeof MdxId>;

export type MdxType = $Enums.MdxType;
export const MdxType = $Enums.MdxType;

export type MdxText = {
  id: MdxId;
  text: Mdx;
  version: number;
} & (
  | {
      type: typeof MdxType.courseLanding;
      relationId: CourseId;
    }
  | {
      type: typeof MdxType.courseShortDescription;
      relationId: CourseId;
    }
  | {
      type: typeof MdxType.contentBlockText;
      relationId: ContentBlockId;
    }
  | {
      type: typeof MdxType.lessonShortDescription;
      relationId: LessonId;
    }
);

export const Mdx = z.string().brand("Mdx");
export type Mdx = z.infer<typeof Mdx>;

export const MdxCompiled = z.string().brand("MdxCompiled");
export type MdxCompiled = z.infer<typeof MdxCompiled>;
