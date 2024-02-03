import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useMapCache } from "../queries";
import { MapNodeId } from "@/entities/map/map-node";
import { updateNodeAction } from "../../_actions/update-node";

const mutationKey = ["map", "move-node"];

export const useMoveNode = () => {
  const updateNode = useServerAction(updateNodeAction);
  const mapCache = useMapCache();

  const { mutate: move } = useMutation({
    mutationKey: mutationKey,
    mutationFn: async (data: { x: number; y: number; id: MapNodeId }) => {
      return updateNode(data);
    },
    onMutate: async (moveParams) => {
      await mapCache.cancelQuery();
      const previousMap = mapCache.get();
      mapCache.updateNodePosition(moveParams);
      return { previousMap };
    },
    onError: (_, __, context) => {
      mapCache.set(context?.previousMap);
    },
    onSettled: () => {
      mapCache.invalidate();
    },
  });

  return {
    move,
  };
};
