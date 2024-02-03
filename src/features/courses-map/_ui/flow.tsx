"use client";
import { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
} from "reactflow";
import { MapProjection } from "../_domain/projections";
import { customNodes } from "./nodes/custom-nodes";
import { getFlowNode } from "../_vm/data-prepare/flow-nodes/get-flow-node";
import { useMoveNode } from "../_vm/actions/use-move-node";
import { SafeLocalStorage } from "@/shared/lib/safe-local-storage";
import { z } from "zod";

const flowKey = "react-flow";

const viewportStorage = new SafeLocalStorage(
  "viewport",
  z.union([
    z.object({
      x: z.number(),
      y: z.number(),
      zoom: z.number(),
    }),
    z.undefined(),
  ]),
  undefined,
);

export function Flow({ map }: { map: MapProjection }) {
  const initialNodes = useMemo(
    () =>
      map.nodeIds.map(
        (id) => {
          const node = map.nodes[id];
          return getFlowNode(node);
        },
        [map],
      ),
    [map],
  );
  const flow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState([]);

  const { move } = useMoveNode();

  const onSave = useCallback(() => {
    const flowObj = flow.toObject();
    viewportStorage.set(flowObj.viewport);
  }, [flow]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        fitView={!viewportStorage.get()}
        defaultViewport={viewportStorage.get()}
        onlyRenderVisibleElements={true}
        onMoveEnd={onSave}
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={10}
        minZoom={0.01}
        onNodesDelete={console.log.bind(null, "nodes delete")}
        onNodeDragStop={(_, node) => {
          console.log("move");
          move({ x: node.position.x, y: node.position.y, id: node.id });
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
