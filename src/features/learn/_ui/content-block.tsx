import { LessonSlug } from "@/entities/course/lesson";
import { ContentBlock } from "../_domain/projections";
import { useViewContentBlock } from "../_vm/use-view-content-block";
import { TextBlock } from "./content-blocks/text-block";
import { CourseSlug } from "@/entities/course/course";

export function ContentBlock({
  contentBlock,
  courseSlug,
  lessonSlug,
}: {
  contentBlock: ContentBlock;
  lessonSlug: LessonSlug;
  courseSlug: CourseSlug;
}) {
  const { contentBlockRef } = useViewContentBlock({
    lessonSlug,
    courseSlug,
    contentBlockId: contentBlock.id,
  });

  const renderContent = () => {
    if (contentBlock.type === "text") {
      return <TextBlock text={contentBlock.text} />;
    }

    return null;
  };

  return <div ref={contentBlockRef}>{renderContent()}</div>;
}
