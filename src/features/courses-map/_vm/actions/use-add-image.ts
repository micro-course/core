import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { addImageNodeAction } from "../../_actions/add-image-node";
import { useInvalidateMap } from "../queries";
import { DimensionsStrings } from "../../_domain/projections";
import { parseDimensions } from "../../_domain/methods/transform-dimensions";
import { useGetScreenCenter } from "../lib/flow/use-get-screen-center";

const mutationKey = ["map", "add-image"];

export const useAddImage = () => {
  const addImageNode = useServerAction(addImageNodeAction);
  const invalidateMap = useInvalidateMap();

  const getScreenCenter = useGetScreenCenter();
  const addImage = async ({
    src,
    ...dimensions
  }: { src: string } & DimensionsStrings) => {
    const parsedDimensions = parseDimensions(dimensions);

    const { x, y } = getScreenCenter({
      width: parsedDimensions.width * parsedDimensions.scale,
      height: parsedDimensions.width * parsedDimensions.scale,
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
