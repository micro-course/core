import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { toZod } from "tozod";
import { DimensionsStrings } from "../../_domain/projections";

export const dimensionsFieldsSchema: toZod<DimensionsStrings> = z.object({
  width: z.string(),
  height: z.string(),
  scale: z.string(),
  rotation: z.string(),
});

type FormValues = z.infer<typeof dimensionsFieldsSchema>;

export function DimensionsFields({}) {
  const form = useFormContext<FormValues>();

  return (
    <>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>width</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>height</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="scale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>scale</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rotation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rotation</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
