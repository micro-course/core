/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { ImageNodeProjection } from "../../../_domain/projections";

import { NodeProps, NodeToolbar } from "reactflow";
import {
  DialogType,
  useDialogSetState,
} from "@/features/courses-map/_vm/lib/diaglos";
import { Button } from "@/shared/ui/button";
import { Pen, Settings2 } from "lucide-react";

export default function ImageNode(props: NodeProps<ImageNodeProjection>) {
  const setDialogState = useDialogSetState(DialogType.UPDATE_NODE_BASE);

  return (
    <>
      <NodeToolbar>
        <div className={cn(" flex gap-2")}>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() =>
              setDialogState.setState({ isOpen: true, node: props.data })
            }
          >
            <Settings2 />
          </Button>
        </div>
      </NodeToolbar>

      <div
        className={cn(props.selected && "outline-primary outline", "relative ")}
        style={{
          transform: `scale(${props.data.scale}) rotate(${props.data.rotation})`,
        }}
      >
        <img
          src={props.data.data.src}
          alt=""
          style={{
            width: props.data.width,
            height: props.data.height,
          }}
        />
      </div>
    </>
  );
}
