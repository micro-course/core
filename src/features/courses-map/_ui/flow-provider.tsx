"use client";
import { ReactFlowProvider } from "reactflow";

export function FlowProvider({ children }: { children: React.ReactNode }) {
  return <ReactFlowProvider> {children}</ReactFlowProvider>;
}
