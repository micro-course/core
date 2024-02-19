/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { CourseNode } from "../../../_domain/projections";

import { Handle, NodeProps, Position } from "reactflow";
import Toolbar from "../_toolbar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useMapAbility } from "../../../_vm/use-map-ability";
import Link from "next/link";
import { CourseProgressCircle } from "@/entities/student-progress/student-progress";
import { useHoverDirty } from "react-use";
import { useRef } from "react";

export default function CourseNode(props: NodeProps<CourseNode>) {
  const ability = useMapAbility();
  const canManageNodes = ability?.canMangeNodes() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useHoverDirty(cardRef);

  return (
    <>
      <Toolbar {...props} isHovered={isHovered} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
      <Link
        href={`/course/${props.data.data.slug}`}
        className="flex justify-center items-center"
        style={{
          width: `${props.data.width * props.data.scale}px`,
          height: `${props.data.height * props.data.scale}px`,
        }}
      >
        <Card
          ref={cardRef}
          className={cn(
            "shrink-0 shadow hover:shadow-lg cursor-pointer ",
            "transition-color hover:outline hover:outline-primary",
            props.selected && canManageNodes && "outline-primary outline ",
            props.data.hidden && "opacity-50",
          )}
          style={{
            width: `${props.data.width}px`,
            height: `${props.data.height}px`,
            transform: `scale(${props.data.scale}) rotate(${props.data.rotation}deg) `,
            transformOrigin: "center center",
          }}
        >
          <CourseProgressCircle
            courseProgress={props.data.data.progress}
            className="absolute -left-4 -top-4"
          />
          <img
            className="w-full h-[150px] object-cover"
            src={props.data.data.thumbnail}
            loading="lazy"
            alt=""
          />
          <CardHeader>
            <CardTitle>{props.data.data.title}</CardTitle>
            <CardDescription className="empty:invisible">
              {props.data.data.shortDescription}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
