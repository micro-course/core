import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useInvalidateMap } from "../queries";
import { MapNodeId, MapNodeSettings } from "@/entities/map/map-node";
import { DimensionsStrings, PositionStrings } from "../../_domain/projections";
import { parseDimensions } from "../../_domain/methods/transform-dimensions";
import { parsePosition } from "../../_domain/methods/transform-position";
import { updateNodeAction } from "../../_actions/update-node";

const mutationKey = ["map", "update-node-base"];

export const useUpdateNode = () => {
  const updateNode = useServerAction(updateNodeAction);
  const invalidateMap = useInvalidateMap();

  const update = async ({
    zIndex,
    ...data
  }: { id: MapNodeId } & DimensionsStrings &
    PositionStrings &
    MapNodeSettings) => {
    return updateNode({
      ...data,
      ...parseDimensions(data),
      ...parsePosition({ ...data, zIndex }),
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
    updateNode: mutateAsync,
    isPending,
  };
};

export function useUpdateNodeLoading() {
  return useIsMutating({
    mutationKey: mutationKey,
  });
}
