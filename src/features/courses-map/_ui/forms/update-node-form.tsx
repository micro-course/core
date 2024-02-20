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
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/spinner";
import { DimensionsFields, dimensionsFieldsSchema } from "./dimensions-fields";
import { PositionFields, positionFieldsSchema } from "./position-fields";
import { Switch } from "@/shared/ui/switch";
import { CoursesMapNode } from "../../_domain/projections";
import {
  useUpdateNode,
  useUpdateNodeLoading,
} from "../../_vm/actions/use-update-node";
import { stringifyPosition } from "../../_domain/methods/transform-position";
import { stringifyDimensions } from "../../_domain/methods/transform-dimensions";

const formSchema = z
  .object({
    hidden: z.boolean(),
  })
  .merge(dimensionsFieldsSchema)
  .merge(positionFieldsSchema);

type FormValues = z.infer<typeof formSchema>;

export function UpdateNodeForm({
  onSuccess,
  children,
  node,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
  node: CoursesMapNode;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hidden: node.hidden,
      ...stringifyDimensions(node),
      ...stringifyPosition(node),
    },
  });

  const { updateNode } = useUpdateNode();

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateNode({
      id: node.id,
      ...data,
    });
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  );
}

export function UpdateNodeFormFields() {
  const form = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="hidden"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="!mt-0">Скрыто</FormLabel>
          </FormItem>
        )}
      />
      <PositionFields />
      <DimensionsFields />
    </div>
  );
}

export function UpdateNodeFormActions() {
  const isLoading = useUpdateNodeLoading();
  const form = useFormContext<FormValues>();

  return (
    <>
      <Button
        type="submit"
        disabled={
          !form.formState.isValid || !!isLoading || !form.formState.isDirty
        }
      >
        {!!isLoading && (
          <Spinner className="mr-2 h-4 w-4" aria-label="Обновление ноды" />
        )}
        Обновить
      </Button>
    </>
  );
}
