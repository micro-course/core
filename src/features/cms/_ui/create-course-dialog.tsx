import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { UpsertCourseForm } from "./upsert-course-form";
import { Button } from "@/shared/ui/button";
import { crmApi } from "../_api";
import { useState } from "react";

export function CreateCourseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const utils = crmApi.useUtils();
  const upsertCourseMutation = crmApi.crm.upsertCourse.useMutation({
    onSuccess: () => {
      setIsOpen(false);
    },
    onSettled: () => {
      return utils.invalidate();
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
        </DialogHeader>
        <UpsertCourseForm
          onSubmit={upsertCourseMutation.mutate}
          isLoading={upsertCourseMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
