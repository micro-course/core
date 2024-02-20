import { LessonSlug } from "@/entities/course/lesson";
import { ContentBlock } from "../_domain/projections";
import { useViewContentBlock } from "../_vm/use-view-content-block";
import { TextBlock } from "./content-blocks/text-block";
import { CourseSlug } from "@/entities/course/course";
import { useEffect } from "react";

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

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");

    if (currentHash === contentBlock.id) {
      window.location.href.split("#")[0];
      window.location.hash = "#";
      contentBlockRef.current?.scrollIntoView();
    }
  }, [contentBlock.id, contentBlockRef]);

  const renderContent = () => {
    if (contentBlock.type === "text") {
      return <TextBlock text={contentBlock.text} />;
    }

    return null;
  };

  return (
    <div id={contentBlock.id} ref={contentBlockRef}>
      {renderContent()}
    </div>
  );
}
