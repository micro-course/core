import { SafeLocalStorage } from "@/shared/lib/local-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useReactFlow, Viewport } from "reactflow";
import { z } from "zod";

const viewportSchema = z.union([
  z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    zoom: z.coerce.number(),
  }),
  z.undefined(),
]);

const viewportStorage = new SafeLocalStorage(
  "viewport",
  viewportSchema,
  undefined,
);

export function useInitialViewportEffect() {
  const flow = useReactFlow();

  useEffect(() => {
    let viewport = viewportSchema
      .catch(() => undefined)
      .parse(
        Object.fromEntries(
          new URLSearchParams(window.location.search).entries(),
        ),
      );

    viewport ??= viewportStorage.get();

    if (viewport) {
      flow.setViewport(viewport);
    } else {
      flow.fitView();
    }
  }, [flow]);

  const setViewport = (viewport: Viewport) => {
    viewportStorage.set(viewport);

    const url = new URL(window.location.href);

    if (viewport) {
      url.search = new URLSearchParams(
        Object.entries(viewport).map(([key, value]) => [key, value.toString()]),
      ).toString();
    }

    window.history.replaceState(null, "", url);
  };

  return {
    setViewport,
  };
}
