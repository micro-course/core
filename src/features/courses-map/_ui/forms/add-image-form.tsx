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
import { ImageField } from "./image-field";
import {
  INITIAL_HEIGHT,
  INITIAL_ROTATION,
  INITIAL_SCALE,
  INITIAL_WIDTH,
} from "../../_constants";
import { DimensionsFields, dimensionsFieldsSchema } from "./dimensions-fields";
import {
  useAddImage,
  useAddImageLoading,
} from "../../_vm/actions/use-add-image";
import { stringifyDimensions } from "../../_domain/methods/transform-dimensions";

const formSchema = z
  .object({
    src: z.string().min(5),
  })
  .merge(dimensionsFieldsSchema);

type FormValues = z.infer<typeof formSchema>;

export function AddImageForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: "",
      ...stringifyDimensions({
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
        scale: INITIAL_SCALE,
        rotation: INITIAL_ROTATION,
      }),
    },
  });

  const addImage = useAddImage();

  const handleSubmit = form.handleSubmit(async (data) => {
    addImage.addImage(data);
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  );
}

export function AddImageFormFields() {
  const form = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-4">
      {form.watch("src") && (
        <div className="max-w-[400px] max-h-[400px] overflow-auto  self-center">
          <img
            className="object-contain max-w-none"
            alt="image"
            src={form.watch("src")}
            style={{
              width: form.watch("width"),
              height: form.watch("height"),
              transform: `scale(${form.watch("scale")}) rotate(${form.watch(
                "rotation",
              )}deg)`,
            }}
          />
        </div>
      )}
      <FormField
        control={form.control}
        name="src"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Картинка</FormLabel>
            <FormControl>
              <ImageField src={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DimensionsFields />
    </div>
  );
}

export function AddImageFormActions() {
  const isLoading = useAddImageLoading();

  return (
    <Button type="submit">
      {!!isLoading && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Обновление профиля"
        />
      )}
      Добавить
    </Button>
  );
}
