"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogContent,
} from "@/shared/ui/dialog";
import { DialogType, useDialog } from "../../_vm/lib/diaglos";
import {
  UpdateNodeBaseForm,
  UpdateNodeBaseFormFields,
  UpdateNodeBaseFormActions,
} from "../forms/update-node-base-form";

export function UpdateNodeBaseDialog() {
  const updateNodeBaseDialog = useDialog(DialogType.UPDATE_NODE_BASE);

  return (
    <Dialog
      onOpenChange={updateNodeBaseDialog.close}
      open={updateNodeBaseDialog.state.isOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        {updateNodeBaseDialog.state.isOpen && (
          <UpdateNodeBaseForm
            onSuccess={updateNodeBaseDialog.close}
            node={updateNodeBaseDialog.state.node}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Обновление ноды</DialogTitle>
              <DialogDescription>
                Общие для всех типов нод параметры
              </DialogDescription>
            </DialogHeader>
            <UpdateNodeBaseFormFields />
            <DialogFooter className="mt-3">
              <UpdateNodeBaseFormActions />
            </DialogFooter>
          </UpdateNodeBaseForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
