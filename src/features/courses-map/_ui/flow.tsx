"use client";
import { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import { MapProjection } from "../_domain/projections";
import { customNodes } from "./nodes/custom-nodes";
import { getFlowNode } from "../_vm/data-prepare/flow-nodes/get-flow-node";
import { useMoveNode } from "../_vm/actions/use-move-node";

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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { move } = useMoveNode();

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={10}
        minZoom={0.01}
        onConnect={onConnect}
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
