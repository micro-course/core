import { Button } from "@/shared/ui/button";
import { FilePlus, ImagePlus } from "lucide-react";
import { DialogType, useDialog } from "../_vm/lib/diaglos";

export const ActionsPanel = () => {
  const addImageDialog = useDialog(DialogType.ADD_IMAGE);
  const addCourseDialog = useDialog(DialogType.ADD_COURSE);

  const actions = [
    {
      title: "Add image",
      icon: <ImagePlus />,
      onClick: () => {
        addImageDialog.setState({ isOpen: true });
      },
    },
    {
      title: "Add course",
      icon: <FilePlus />,
      onClick: () => {
        addCourseDialog.setState({ isOpen: true });
      },
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {actions.map(({ title, icon, onClick }, i) => (
        <Button
          key={i}
          variant={"ghost"}
          size={"icon"}
          title={title}
          className="[&>svg]:w-5"
          onClick={onClick}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};
