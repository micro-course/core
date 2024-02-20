import { useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useMapCache } from "../queries";
import { MapNodeId } from "@/entities/map/map-node";
import { deleteNodeAction } from "../../_actions/delete-node";

const mutationKey = ["map", "delete-node"];

export const useDeleteNode = () => {
  const deleteNode = useServerAction(deleteNodeAction);
  const mapCache = useMapCache();

  const { mutate } = useMutation({
    mutationKey: mutationKey,
    mutationFn: async (data: { id: MapNodeId }) => {
      return deleteNode(data);
    },
    onMutate: async (deleteParams) => {
      await mapCache.cancelQuery();
      const previousMap = mapCache.get();
      mapCache.removeNode(deleteParams);
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
    deleteNode: mutate,
  };
};
