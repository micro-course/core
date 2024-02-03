import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { addImageNodeAction } from "../../_actions/add-image-node";
import { useInvalidateMap } from "../queries";
import { useReactFlow } from "reactflow";
import { DimensionsStrings } from "../../_domain/projections";
import { parseDimensions } from "../../_domain/methods/transform-dimensions";

const mutationKey = ["map", "add-image"];

export const useAddImage = () => {
  const reactFlow = useReactFlow();
  const addImageNode = useServerAction(addImageNodeAction);
  const invalidateMap = useInvalidateMap();

  const addImage = async ({
    src,
    ...dimensions
  }: { src: string } & DimensionsStrings) => {
    const parsedDimensions = parseDimensions(dimensions);
    const { y, x } = reactFlow.screenToFlowPosition({
      x:
        document.documentElement.clientWidth / 2 -
        (parsedDimensions.width * parsedDimensions.scale) / 2,
      y:
        document.documentElement.clientHeight / 2 -
        (parsedDimensions.width * parsedDimensions.scale) / 2,
    });

    return addImageNode({
      x,
      y,
      src,
      hidden: true,
      ...parseDimensions(dimensions),
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addImage,
    mutationKey: mutationKey,

    onSettled: async () => {
      await invalidateMap();
    },
  });

  return {
    addImage: mutateAsync,
    isPending,
  };
};

export function useAddImageLoading() {
  return useIsMutating({
    mutationKey: mutationKey,
  });
}
