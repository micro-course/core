import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { addCourseNodeAction } from "../../_actions/add-course-node";
import { useInvalidateMap } from "../queries";
import { DimensionsStrings } from "../../_domain/projections";
import { parseDimensions } from "../../_domain/methods/transform-dimensions";
import { useGetScreenCenter } from "../lib/flow/use-get-screen-center";

const mutationKey = ["map", "add-course"];

export const useAddCourse = () => {
  const addCourseNode = useServerAction(addCourseNodeAction);
  const invalidateMap = useInvalidateMap();

  const getScreenCenter = useGetScreenCenter();
  const addCourse = async ({
    courseId,
    ...dimensions
  }: { courseId: string } & DimensionsStrings) => {
    const parsedDimensions = parseDimensions(dimensions);

    const { x, y } = getScreenCenter({
      width: parsedDimensions.width * parsedDimensions.scale,
      height: parsedDimensions.width * parsedDimensions.scale,
    });

    return addCourseNode({
      x,
      y,
      courseId,
      hidden: true,
      ...parseDimensions(dimensions),
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addCourse,
    mutationKey: mutationKey,

    onSettled: async () => {
      await invalidateMap();
    },
  });

  return {
    addCourse: mutateAsync,
    isPending,
  };
};

export function useAddCourseLoading() {
  return useIsMutating({
    mutationKey: mutationKey,
  });
}
