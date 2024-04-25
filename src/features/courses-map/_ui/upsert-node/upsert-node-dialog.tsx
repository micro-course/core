"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/shared/ui/dialog";
import {
  UpsertNodeForm,
  UpsertNodeFormActions,
  UpsertNodeFormFields,
} from "./upsert-node-form";
import { useUpsertNodeModal } from "../../_vm/upsert-node/use-upsert-node-modal";

export function UpsertNodeDialog() {
  const { isOpen, close, node } = useUpsertNodeModal();
  const isEdit = !!node;

  return (
    <Dialog onOpenChange={close} open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <UpsertNodeForm onSuccess={close} node={node}>
          <DialogHeader className="mb-3">
            <DialogTitle>
              {isEdit ? "Обновление узла" : "Добавление узла"}
            </DialogTitle>
          </DialogHeader>
          <UpsertNodeFormFields node={node} />
          <DialogFooter className="mt-3">
            <UpsertNodeFormActions />
          </DialogFooter>
        </UpsertNodeForm>
      </DialogContent>
    </Dialog>
  );
}
