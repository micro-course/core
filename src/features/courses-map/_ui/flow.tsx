"use client";
import { cn } from "@/shared/ui/utils";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import css from "./flow.module.css";
import { BG_CLASS_NAME } from "../_constant";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={cn("fixed inset-0 flex flex-col", css.root)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
