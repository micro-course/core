import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { addImageNodeAction } from "../../_actions/add-image-node";
import { useInvalidateMap } from "../queries";
import { useReactFlow } from "reactflow";

const mutationKey = ["map", "add-image"];

export const useAddImage = () => {
  const reactFlow = useReactFlow();
  const addImageNode = useServerAction(addImageNodeAction);
  const invalidateMap = useInvalidateMap();

  const addImage = async ({
    src,
    ...dimensions
  }: {
    width: string;
    height: string;
    scale: string;
    rotation: string;
    src: string;
  }) => {
    const { y, x } = reactFlow.screenToFlowPosition({
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight / 2,
    });

    return addImageNode({
      x,
      y,
      src,
      hidden: true,
      ...dimensions,
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
