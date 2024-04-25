import { cn } from "@/shared/ui/utils";

import { NodeProps, NodeToolbar } from "reactflow";
import { Button } from "@/shared/ui/button";
import { Settings2, Trash2 } from "lucide-react";
import { CoursesMapNode } from "../../_domain/types";
import { useCoursesMapAblity } from "../../_vm/lib/use-courses-map-ability";
import { useUpsertNodeModal } from "../../_vm/upsert-node/use-upsert-node-modal";
import { useDeleteNode } from "../../_vm/nodes/use-delete-node";

export function Toolbar(props: NodeProps<CoursesMapNode>) {
  const ability = useCoursesMapAblity();
  const openUpsert = useUpsertNodeModal((state) => state.open);
  const { deleteNode } = useDeleteNode();

  if (!ability?.canUpdateCoursesMap()) {
    return null;
  }

  return (
    <NodeToolbar>
      <div className={cn(" flex gap-2 z-50")}>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            openUpsert(props.data);
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
  );
}
