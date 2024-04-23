"use client";
import ReactFlow from "reactflow";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function CoursesMap() {
  return (
    <div className="grow relative">
      <div className="fixed inset-0 flex flex-col">
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
    </div>
  );
}
