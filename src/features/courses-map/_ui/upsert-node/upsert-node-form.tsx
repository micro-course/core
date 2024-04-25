"use client";
/* eslint-disable @next/next/no-img-element */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/spinner";
import { CommonFields, commonFieldsSchema } from "./field-groups/common-fields";
import { CourseFields } from "./field-groups/course-fields";
import { CourseNode, CoursesMapNode } from "../../_domain/types";
import {
  INITIAL_HEIGHT,
  INITIAL_ROTATION,
  INITIAL_SCALE,
  INITIAL_WIDTH,
} from "../../_constant";
import { useGetScreenCenter } from "../../_vm/lib/use-get-screen-center";
import { MAP_NODE_TYPES } from "@/entities/map";

const formSchema = z
  .object({
    courseId: z.string().min(5),
  })
  .merge(commonFieldsSchema);

type FormValues = z.infer<typeof formSchema>;

export function UpsertNodeForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children?: React.ReactNode;
  node?: CoursesMapNode;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  );
}

export function UpsertNodeFormFields({ node }: { node?: CoursesMapNode }) {
  const form = useFormContext<FormValues>();

  const getScreenCenter = useGetScreenCenter();

  const screenCenter = getScreenCenter({
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
  });

  return (
    <div className="flex flex-col gap-4">
      <CommonFields
        defaultFields={{
          height: (node?.height ?? INITIAL_HEIGHT).toString(),
          width: (node?.width ?? INITIAL_WIDTH).toString(),
          rotation: (node?.rotation ?? INITIAL_ROTATION).toString(),
          scale: (node?.scale ?? INITIAL_SCALE).toString(),
          hidden: node?.hidden ?? false,
          x: (node?.x ?? screenCenter.x).toString(),
          y: (node?.y ?? screenCenter.y).toString(),
          zIndex: node?.zIndex?.toString() ?? "",
          type: node?.type,
        }}
        renderSpecificFields={({ type }) =>
          type === MAP_NODE_TYPES.COURSE ? (
            <CourseFields
              defaultValues={{
                courseId: (node as CourseNode)?.courseId,
              }}
            />
          ) : null
        }
      />
    </div>
  );
}

export function UpsertNodeFormActions() {
  return (
    <Button type="submit">
      <Spinner
        className="mr-2 h-4 w-4 animate-spin"
        aria-label="Добавление курса"
      />
      Добавить
    </Button>
  );
}
