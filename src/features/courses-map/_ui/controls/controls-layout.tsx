import { cn } from "@/shared/ui/utils";
import { BG_CLASS_NAME } from "../../_constant";

export function ControlsLayout({
  actionsPanel,
}: {
  actionsPanel?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "empty:hidden absolute top-1/2 -translate-y-1/2 left-4  z-20 border rounded p-2  ",
        BG_CLASS_NAME,
      )}
    >
      {actionsPanel}
    </div>
  );
}
