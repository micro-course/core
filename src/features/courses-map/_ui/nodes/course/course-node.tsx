/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { CourseNode } from "../../../_domain/projections";

import { NodeProps } from "reactflow";
import Toolbar from "../_toolbar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function CourseNode(props: NodeProps<CourseNode>) {
  return (
    <>
      <Toolbar {...props} />
      <div
        className="flex justify-center items-center"
        style={{
          width: `${props.data.width * props.data.scale}px`,
          height: `${props.data.height * props.data.scale}px`,
        }}
      >
        <Card
          onClick={() => {
            console.log("click");
          }}
          className={cn(
            "overflow-hidden shrink-0",
            props.selected && "outline-primary outline ",
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
      </div>
    </>
  );
}

import * as React from "react";
