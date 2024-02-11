import { LessonId, ContentBlockId } from "@/kernel";
import { StudentProgress } from "../projections";

export type LessonProgressPercent =
  | {
      type: "not-started";
    }
  | {
      type: "completed";
      percent: number;
    }
  | { type: "in-progress"; percent: number };

type LessonEntity = {
  id: LessonId;
  blocks: {
    id: ContentBlockId;
  }[];
};

export function getLessonProgressPercent(
  lessonEntity: LessonEntity,
  studentProgress: StudentProgress,
): LessonProgressPercent {
  const lessonProgress = studentProgress.lessons[lessonEntity.id];

  if (!lessonProgress) {
    return {
      type: "not-started",
    };
  }

  const completedLessons = lessonEntity.blocks
    .map((block) => !!studentProgress.contentBlocks[block.id]?.completedAt)
    .filter((completed): completed is true => completed).length;

  const percent = completedLessons / lessonEntity.blocks.length;

  if (lessonProgress.completedAt) {
    return {
      type: "completed",
      percent,
    };
  }

  return {
    type: "in-progress",
    percent,
  };
}
