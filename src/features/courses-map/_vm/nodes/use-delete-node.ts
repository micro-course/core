import { coursesMapApi } from "../../_api";

export function useDeleteNode() {
  const utils = coursesMapApi.useUtils();
  const { mutate } = coursesMapApi.coursesMap.deleteNode.useMutation({
    onMutate({ id }) {
      utils.coursesMap.get.cancel();
      const coursesList = utils.coursesMap.get.getData();

      utils.coursesMap.get.setData(undefined, (data) => {
        return data?.filter((node) => node.id !== id);
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

  return {
    deleteNode: mutate,
  };
}
