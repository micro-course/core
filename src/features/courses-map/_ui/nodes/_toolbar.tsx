import { cn } from "@/shared/ui/utils";
import { CoursesMapNode } from "../../_domain/projections";

import { NodeProps, NodeToolbar } from "reactflow";
import {
  DialogType,
  useDialogSetState,
} from "@/features/courses-map/_vm/lib/diaglos";
import { Button } from "@/shared/ui/button";
import { Settings2, Trash2 } from "lucide-react";
import { useDeleteNode } from "../../_vm/actions/use-delete-node";

export default function Toolbar(props: NodeProps<CoursesMapNode>) {
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
    </>
  );
}
