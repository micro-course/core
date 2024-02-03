"use client";
/* eslint-disable @next/next/no-img-element */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import { Form, FormField, FormItem } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/spinner";
import { DimensionsFields, dimensionsFieldsSchema } from "./dimensions-fields";
import { PositionFields, positionFieldsSchema } from "./position-fields";
import { Switch } from "@/shared/ui/switch";
import { MapNodeProjection } from "../../_domain/projections";
import { Label } from "@/shared/ui/label";
import {
  useUpdateNodeBase,
  useUpdateNodeBaseLoading,
} from "../../_vm/actions/use-update-node-base";

const formSchema = z
  .object({
    hidden: z.boolean(),
  })
  .merge(dimensionsFieldsSchema)
  .merge(positionFieldsSchema);

type FormValues = z.infer<typeof formSchema>;

export function UpdateNodeBaseForm({
  onSuccess,
  children,
  node,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
  node: MapNodeProjection;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hidden: node.hidden,
      x: String(node.x),
      y: String(node.y),
      width: node.width,
      height: node.height,
      scale: node.scale,
      rotation: node.rotation,
      zIndex: node.zIndex ? String(node.zIndex) : "",
    },
  });

  const { updateNodeBase } = useUpdateNodeBase();

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateNodeBase({
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

export function UpdateNodeBaseFormFields() {
  const form = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="hidden"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <Switch onChange={field.onChange} checked={field.value} />
            <Label>Скрыто</Label>
          </FormItem>
        )}
      />
      <PositionFields />
      <DimensionsFields />
    </div>
  );
}

export function UpdateNodeBaseFormActions() {
  const isLoading = useUpdateNodeBaseLoading();
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
