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
  UpdateNodeForm,
  UpdateNodeFormFields,
  UpdateNodeFormActions,
} from "../forms/update-node-form";

export function UpdateNodeDialog() {
  const updateNodeDialog = useDialog(DialogType.UPDATE_NODE);

  console.log(updateNodeDialog.state);

  return (
    <Dialog
      onOpenChange={updateNodeDialog.close}
      open={updateNodeDialog.state.isOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        {updateNodeDialog.state.isOpen && (
          <UpdateNodeForm
            onSuccess={updateNodeDialog.close}
            node={updateNodeDialog.state.node}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Обновление ноды</DialogTitle>
              <DialogDescription>
                Общие для всех типов нод параметры
              </DialogDescription>
            </DialogHeader>
            <UpdateNodeFormFields />
            <DialogFooter className="mt-3">
              <UpdateNodeFormActions />
            </DialogFooter>
          </UpdateNodeForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
