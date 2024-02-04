import { useServerAction } from "@/shared/lib/server-action/client";
import { getMapAction } from "../_actions/get-map";
import { getCoursesToAddAction } from "../_actions/get-courses-to-add";
import { useQueryClient } from "@tanstack/react-query";
import { MapNodeId, MapNodePosition } from "@/entities/map/map-node";
import { Map } from "../_domain/projections";

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

export const useMapCache = () => {
  const queryClient = useQueryClient();

  const removeNode = ({ id }: { id: MapNodeId }) =>
    queryClient.setQueryData([baseKey, "map"], (data: Map) => {
      const node = data.nodes[id];
      if (!node) {
        return data;
      }

      const newNodes = { ...data.nodes };
      delete newNodes[id];

      return {
        ...data,
        nodeIds: data.nodeIds.filter((nodeId) => nodeId !== id),
        nodes: newNodes,
      } satisfies Map;
    });

  const updateNodePosition = ({
    x,
    y,
    id,
  }: MapNodePosition & { id: MapNodeId }) =>
    queryClient.setQueryData([baseKey, "map"], (data: Map) => {
      const node = data.nodes[id];
      if (!node) {
        return data;
      }

      return {
        ...data,
        nodes: {
          ...data.nodes,
          [id]: {
            ...node,
            x,
            y,
          },
        },
      } satisfies Map;
    });

  const cancelQuery = () =>
    queryClient.cancelQueries({
      queryKey: [baseKey, "map"],
    });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "map"],
    });

  const set = (data?: Map) => queryClient.setQueryData([baseKey, "map"], data);

  const get = () => queryClient.getQueryData<Map>([baseKey, "map"]);

  return {
    updateNodePosition,
    cancelQuery,
    invalidate,
    set,
    get,
    removeNode,
  };
};
