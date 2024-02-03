"use client";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
  OnNodesDelete,
  NodeDragHandler,
  SelectionDragHandler,
} from "reactflow";
import { MapProjection } from "../_domain/projections";
import { customNodes } from "./nodes/custom-nodes";
import { getFlowNode } from "../_vm/data-prepare/flow-nodes/get-flow-node";
import { useMoveNode } from "../_vm/actions/use-move-node";
import { SafeLocalStorage } from "@/shared/lib/safe-local-storage";
import { z } from "zod";
import { useDeleteNode } from "../_vm/actions/use-delete-node";
import { ReactFlowNode } from "../_vm/data-prepare/flow-nodes/reactflow-node";

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
  const flow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState([]);

  const { move } = useMoveNode();
  const { deleteNode } = useDeleteNode();

  const onSave = useCallback(() => {
    const flowObj = flow.toObject();
    viewportStorage.set(flowObj.viewport);
  }, [flow]);

  const handleSelectionDragStop: SelectionDragHandler = useCallback(
    (_, nodes) => {
      console.log("selection drag stop", nodes);
      nodes.forEach((node) => {
        move({ x: node.position.x, y: node.position.y, id: node.id });
      });
    },
    [move],
  );

  const handleNodeDragStop: NodeDragHandler = useCallback(
    (_, __, nodes) => {
      nodes.forEach((node) => {
        move({ x: node.position.x, y: node.position.y, id: node.id });
      });
    },
    [move],
  );

  const handleNodesDelete: OnNodesDelete = useCallback(
    (nodes) => {
      nodes.forEach((node) => {
        deleteNode({ id: node.id });
      });
    },
    [deleteNode],
  );

  useEffect(() => {
    setNodes((lastNodes) => {
      const lastNodesMap = new Map(lastNodes.map((node) => [node.id, node]));
      return map.nodeIds.map(
        (id) => {
          const node = map.nodes[id];
          return getFlowNode(node, lastNodesMap.get(node.id) as ReactFlowNode);
        },
        [map],
      );
    });
  }, [setNodes, map]);

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
        onNodesDelete={handleNodesDelete}
        onNodeDragStop={handleNodeDragStop}
        onSelectionDragStop={handleSelectionDragStop}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
