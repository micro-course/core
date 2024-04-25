import { z } from "zod";
import { coursesMapApi } from "../../_api";
import { CoursesMapNode } from "../../_domain/types";
import { MAP_NODE_TYPES } from "@/entities/map";

export const upsertNodeSchema = z
  .object({
    width: z.number(),
    height: z.number(),
    scale: z.number(),
    rotation: z.number(),
    x: z.number(),
    y: z.number(),
    zIndex: z.number().optional(),
    hidden: z.boolean(),
  })
  .and(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal(MAP_NODE_TYPES.COURSE),
        courseId: z.string(),
      }),
      z.object({
        type: z.literal(MAP_NODE_TYPES.IMAGE),
        src: z.string(),
      }),
    ]),
  );

export function useUpsertNode(node?: CoursesMapNode) {
  const utils = coursesMapApi.useUtils();

  const invalidate = async () => {
    await utils.coursesMap.invalidate();
  };

  const createMutation = coursesMapApi.coursesMap.createNode.useMutation({
    mutationKey: ["createCourseNode"],
    async onSettled() {
      await invalidate();
    },
  });
  const updateMutation = coursesMapApi.coursesMap.updateNode.useMutation({
    mutationKey: ["updateCourseNode"],
    async onSettled() {
      await invalidate();
    },
  });

  return {
    isPending: createMutation.isPending || updateMutation.isPending,
    save: async (data: z.infer<typeof upsertNodeSchema>) => {
      if (node) {
        await updateMutation.mutateAsync({
          id: node.id,
          ...data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
    },
  };
}
