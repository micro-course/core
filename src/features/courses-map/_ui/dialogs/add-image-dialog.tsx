"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/shared/ui/dialog";
import {
  AddImageForm,
  AddImageFormActions,
  AddImageFormFields,
} from "../forms/add-image-form";
import { DialogType, useDialog } from "../../_vm/lib/diaglos";

export function AddImageDialog() {
  const addImageDialog = useDialog(DialogType.ADD_IMAGE);

  return (
    <Dialog
      onOpenChange={addImageDialog.close}
      open={addImageDialog.state.isOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <AddImageForm onSuccess={addImageDialog.close}>
          <DialogHeader className="mb-3">
            <DialogTitle>Загрузить изображение</DialogTitle>
          </DialogHeader>
          <AddImageFormFields />
          <DialogFooter className="mt-3">
            <AddImageFormActions />
          </DialogFooter>
        </AddImageForm>
      </DialogContent>
    </Dialog>
  );
}
