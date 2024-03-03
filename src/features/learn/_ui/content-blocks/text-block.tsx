import { MdxCode } from "@/shared/lib/mdx";
import Image from "next/image";
import { Sandpack } from "@codesandbox/sandpack-react";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

function Kinescope({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) {
  return (
    <iframe
      src={src}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
      frameBorder={0}
      allowFullScreen
      style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "8px",
        ...style,
      }}
    ></iframe>
  );
}

function CodeSandbox({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) {
  return (
    <iframe
      src={src}
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
        ...style,
      }}
      title="zod"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
}

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
  Kinescope,
  CodeSandbox,
};

export function TextBlock({ text }: { text: string }) {
  return <MdxCode code={text} components={components} />;
}
