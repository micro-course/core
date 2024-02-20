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

export const positionFieldsSchema = z.object({
  x: z.string(),
  y: z.string(),
  zIndex: z.string(),
});

type FormValues = z.infer<typeof positionFieldsSchema>;

export function PositionFields({}) {
  const form = useFormContext<FormValues>();

  return (
    <>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>x</FormLabel>
              <FormControl>
                <Input placeholder="100px" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="y"
          render={({ field }) => (
            <FormItem>
              <FormLabel>y</FormLabel>
              <FormControl>
                <Input placeholder="100px" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>zIndex</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
