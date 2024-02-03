import { useServerAction } from "@/shared/lib/server-action/client";
import { getMapAction } from "../_actions/get-map";
import { getCoursesToAddAction } from "../_actions/get-courses-to-add";
import { useQueryClient } from "@tanstack/react-query";

export const baseKey = "courses-map";

export const useGetMapQuery = () => {
  const getMap = useServerAction(getMapAction);

  return {
    queryKey: [baseKey, "map"],
    queryFn: () => getMap(),
  };
};

export const useGetCoursesToAddQuery = () => {
  const getCoursesToAdd = useServerAction(getCoursesToAddAction);

  return {
    queryKey: [baseKey, "courses-to-add"],
    queryFn: () => getCoursesToAdd(),
  };
};

export const useInvalidateMap = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "map"],
    });
};
