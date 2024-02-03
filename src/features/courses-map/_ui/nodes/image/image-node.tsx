/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { ImageNodeProjection } from "../../../_domain/projections";

import { NodeProps, NodeToolbar } from "reactflow";
import {
  DialogType,
  useDialogSetState,
} from "@/features/courses-map/_vm/lib/diaglos";
import { Button } from "@/shared/ui/button";
import { Settings2, Trash2 } from "lucide-react";
import { useDeleteNode } from "@/features/courses-map/_vm/actions/use-delete-node";

export default function ImageNode(props: NodeProps<ImageNodeProjection>) {
  const setDialogState = useDialogSetState(DialogType.UPDATE_NODE);

  const { deleteNode } = useDeleteNode();

  return (
    <>
      <NodeToolbar>
        <div className={cn(" flex gap-2 z-50")}>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setDialogState.setState({ isOpen: true, node: props.data });
            }}
          >
            <Settings2 />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            color="danger"
            onClick={() => {
              deleteNode({ id: props.id });
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </NodeToolbar>

      <div
        className={cn(
          props.selected && "outline-primary outline ",
          "relative flex items-center justify-center",
        )}
        style={{
          width: `${props.data.width * props.data.scale}px`,
          height: `${props.data.height * props.data.scale}px`,
          pointerEvents: "none",
        }}
      >
        <img
          src={props.data.data.src}
          alt=""
          style={{
            transform: `scale(${props.data.scale}) rotate(${props.data.rotation}deg)`,
            transformOrigin: "center center",
            width: props.data.width,
            height: props.data.height,
          }}
        />
      </div>
    </>
  );
}
