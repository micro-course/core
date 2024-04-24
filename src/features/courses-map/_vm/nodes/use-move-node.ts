import { MapNodeId } from "@/kernel/domain/map";
import { coursesMapApi } from "../../_api";

export function useMoveNode() {
  const utils = coursesMapApi.useUtils();

  const { mutate } = coursesMapApi.coursesMap.updateNode.useMutation({
    onMutate({ id, x, y }) {
      utils.coursesMap.get.cancel();
      const coursesList = utils.coursesMap.get.getData();

      const patch = { x, y };

      utils.coursesMap.get.setData(undefined, (data) => {
        return data?.map((node) =>
          node.id === id ? Object.assign({}, node, patch) : node,
        );
      });

      return { coursesList };
    },
    onError(_, __, context) {
      utils.coursesMap.get.setData(undefined, context?.coursesList);
    },
    async onSettled() {
      await utils.coursesMap.get.invalidate();
    },
  });

  const moveNode = (position: { id: MapNodeId; x: number; y: number }) => {
    mutate(position);
  };

  return {
    moveNode,
  };
}
