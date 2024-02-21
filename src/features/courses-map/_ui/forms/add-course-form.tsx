"use client";
/* eslint-disable @next/next/no-img-element */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/spinner";
import {
  INITIAL_HEIGHT,
  INITIAL_ROTATION,
  INITIAL_SCALE,
  INITIAL_WIDTH,
} from "../../_constants";
import { DimensionsFields, dimensionsFieldsSchema } from "./dimensions-fields";
import {
  useAddCourse,
  useAddCourseLoading,
} from "../../_vm/actions/use-add-course";
import { stringifyDimensions } from "../../_domain/methods/transform-dimensions";
import { CourseToAddField } from "./course-to-add-field";

const formSchema = z
  .object({
    courseId: z.string().min(5),
  })
  .merge(dimensionsFieldsSchema);

type FormValues = z.infer<typeof formSchema>;

export function AddCourseForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...stringifyDimensions({
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
        scale: INITIAL_SCALE,
        rotation: INITIAL_ROTATION,
      }),
    },
  });

  const addCourse = useAddCourse();

  const handleSubmit = form.handleSubmit(async (data) => {
    addCourse.addCourse(data);
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  );
}

export function AddCourseFormFields() {
  const form = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-4">
      <DimensionsFields />
      <FormField
        control={form.control}
        name="courseId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Курс</FormLabel>
            <FormControl>
              <CourseToAddField value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function AddCourseFormActions() {
  const isLoading = useAddCourseLoading();

  return (
    <Button type="submit">
      {!!isLoading && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Добавление курса"
        />
      )}
      Добавить
    </Button>
  );
}
