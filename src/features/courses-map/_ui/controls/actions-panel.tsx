import { Button } from "@/shared/ui/button";
import { FilePlus } from "lucide-react";

export const ActionsPanel = () => {
  return (
    <div className="flex flex-col gap-1">
      <Button
        variant={"ghost"}
        size={"icon"}
        title={"Add"}
        className="[&>svg]:w-5"
      >
        <FilePlus />
      </Button>
    </div>
  );
};
