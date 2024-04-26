/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { MdxCode } from "@/shared/lib/mdx";

import { Handle, NodeProps, Position } from "reactflow";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import type { CourseNode } from "../../../_domain/types";
import { useCoursesMapAblity } from "../../../_vm/lib/use-courses-map-ability";
import { Toolbar } from "../toolbar";
import { useEffect, useState } from "react";

export default function CourseNode(props: NodeProps<CourseNode>) {
  const ability = useCoursesMapAblity();
  const canUpdateCoursesMap = ability?.canUpdateCoursesMap();

  const [hasHref, setHasHref] = useState(!canUpdateCoursesMap);

  useEffect(() => {
    setTimeout(
      () => setHasHref(canUpdateCoursesMap ? props.selected : true),
      300,
    );
  }, [props.selected, canUpdateCoursesMap]);

  return (
    <>
      <Toolbar {...props} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
      <Link
        href={hasHref ? `/course/${props.data.slug}` : `#`}
        className="flex justify-center items-center"
        style={{
          width: `${props.data.width * props.data.scale}px`,
          height: `${props.data.height * props.data.scale}px`,
        }}
      >
        <Card
          className={cn(
            "shrink-0 shadow hover:shadow-lg cursor-pointer ",
            "transition-color hover:outline hover:outline-primary",
            props.selected && canUpdateCoursesMap && "outline-primary outline ",
            props.data.hidden && "opacity-50",
          )}
          style={{
            width: `${props.data.width}px`,
            height: `${props.data.height}px`,
            transform: `scale(${props.data.scale}) rotate(${props.data.rotation}deg) `,
            transformOrigin: "center center",
          }}
        >
          <img
            className="w-full h-[150px] object-cover"
            src={props.data.thumbnail}
            loading="lazy"
            alt=""
          />
          <CardHeader>
            <CardTitle>{props.data.title}</CardTitle>
            {props.data.shortDescription && (
              <MdxCode code={props.data.shortDescription} size="sm" />
            )}
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
