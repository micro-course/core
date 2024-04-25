import { useReactFlow } from "reactflow";

export function useGetScreenCenter() {
  const reactFlow = useReactFlow();

  return ({ height = 0, width = 0 }: { width?: number; height?: number }) => {
    return reactFlow.screenToFlowPosition({
      x: document.documentElement.clientWidth / 2 - width / 2,
      y: document.documentElement.clientHeight / 2 - height / 2,
    });
  };
}
