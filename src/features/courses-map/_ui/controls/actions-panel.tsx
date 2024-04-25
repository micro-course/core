import { Button } from "@/shared/ui/button";
import { FilePlus } from "lucide-react";
import { useUpsertNodeModal } from "../../_vm/upsert-node/use-upsert-node-modal";

export const ActionsPanel = () => {
  const open = useUpsertNodeModal((state) => state.open);
  return (
    <div className="flex flex-col gap-1">
      <Button
        variant={"ghost"}
        size={"icon"}
        title={"Add"}
        className="[&>svg]:w-5"
        onClick={() => open()}
      >
        <FilePlus />
      </Button>
    </div>
  );
};
