"use client";
import { cn } from "@/shared/ui/utils";
import ReactFlow, {
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import css from "./flow.module.css";
import { BG_CLASS_NAME } from "../_constant";
import { CoursesMapNode } from "../_domain/types";
import { useNodes } from "../_vm/nodes/use-nodes";
import { customNodes } from "./nodes/custom-nodes";
import { useCoursesMapAblity } from "../_vm/lib/use-courses-map-ability";
import { useInitialViewportEffect } from "../_vm/flow/use-initial-viewport-effect";
import { useDeleteNode } from "../_vm/nodes/use-delete-node";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function Flow({
  coursesMap: defaultCoursesMap,
}: {
  coursesMap: CoursesMapNode[];
}) {
  const ability = useCoursesMapAblity();

  const { deleteNode } = useDeleteNode();
  const { setViewport } = useInitialViewportEffect();
  const { nodes, onNodesChange } = useNodes(defaultCoursesMap);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const flowProps = ability?.canUpdateCoursesMap()
    ? {
        onNodesChange: onNodesChange,
        onEdgesChange: onEdgesChange,
      }
    : {
        draggable: false,
      };

  return (
    <div className={cn("fixed inset-0 flex flex-col", css.root)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        onlyRenderVisibleElements={true}
        onNodesDelete={(nodes) =>
          nodes.map((node) => deleteNode({ id: node.data.id }))
        }
        onMoveEnd={(_, viewport) => {
          setViewport(viewport);
        }}
        {...flowProps}
      >
        <Controls
          className={cn(
            BG_CLASS_NAME,
            "text-primary fill-primary shadow border",
            "[&>button]:border [&>button]:border-border",
          )}
        />
        <MiniMap
          nodeBorderRadius={4}
          className={cn(
            BG_CLASS_NAME,
            "text-primary fill-primary border border-border",
          )}
          maskColor="hsl(var(--primary) / 0.1)"
          nodeColor={(node) => "hsl(var(--primary) / 0.8)"}
        />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
