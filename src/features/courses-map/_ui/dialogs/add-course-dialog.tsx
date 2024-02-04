"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/shared/ui/dialog";
import {
  AddCourseForm,
  AddCourseFormActions,
  AddCourseFormFields,
} from "../forms/add-course-form";
import { DialogType, useDialog } from "../../_vm/lib/diaglos";

export function AddCourseDialog() {
  const addCourseDialog = useDialog(DialogType.ADD_COURSE);

  return (
    <Dialog
      onOpenChange={addCourseDialog.close}
      open={addCourseDialog.state.isOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <AddCourseForm onSuccess={addCourseDialog.close}>
          <DialogHeader className="mb-3">
            <DialogTitle>Добавить курс</DialogTitle>
          </DialogHeader>
          <AddCourseFormFields />
          <DialogFooter className="mt-3">
            <AddCourseFormActions />
          </DialogFooter>
        </AddCourseForm>
      </DialogContent>
    </Dialog>
  );
}
