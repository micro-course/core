import { ContentBlock } from "../_domain/projections";
import { TextBlock } from "./content-blocks/text-block";

export function ContentBlock({ contentBlock }: { contentBlock: ContentBlock }) {
  const renderContent = () => {
    if (contentBlock.type === "text") {
      return <TextBlock text={contentBlock.text} />;
    }

    return null;
  };

  return <div>{renderContent()}</div>;
}
