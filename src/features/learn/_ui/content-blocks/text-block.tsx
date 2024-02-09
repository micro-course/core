import { MdxCode } from "@/shared/lib/mdx";
import Image from "next/image";
import { Sandpack } from "@codesandbox/sandpack-react";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

function Player({ style, ...props }: ReactPlayerProps) {
  return (
    <ReactPlayer
      {...props}
      style={{ width: "100%", aspectRatio: "16/9", ...style }}
    />
  );
}

const components = {
  NextImage: Image,
  Sandpack,
  Player,
};

export function TextBlock({ text }: { text: string }) {
  return <MdxCode code={text} components={components} />;
}
