import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useInvalidateMap } from "../queries";
import { updateBaseNodeAction } from "../../_actions/update-base-node";
import { MapNodeId } from "@/entities/map/map-node";

const mutationKey = ["map", "update-node-base"];

export const useUpdateNodeBase = () => {
  const updateBaseNode = useServerAction(updateBaseNodeAction);
  const invalidateMap = useInvalidateMap();

  const update = async ({
    x,
    y,
    zIndex,
    ...data
  }: {
    id: MapNodeId;
    x: string;
    y: string;
    width: string;
    height: string;
    scale: string;
    rotation: string;
    zIndex: string;
  }) => {
    return updateBaseNode({
      x: parseFloat(x),
      y: parseFloat(y),
      zIndex: zIndex ? parseInt(zIndex) : undefined,
      ...data,
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: update,
    mutationKey: mutationKey,

    onSettled: async () => {
      await invalidateMap();
    },
  });

  return {
    updateNodeBase: mutateAsync,
    isPending,
  };
};

export function useUpdateNodeBaseLoading() {
  return useIsMutating({
    mutationKey: mutationKey,
  });
}
