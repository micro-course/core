import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { MAP_NODE_TYPES, MapNodeType } from "@/entities/map";

export const commonFieldsSchema = z.object({
  type: z.union([
    z.literal(MAP_NODE_TYPES.COURSE),
    z.literal(MAP_NODE_TYPES.IMAGE),
    z.undefined(),
  ]),
  width: z.string(),
  height: z.string(),
  scale: z.string(),
  rotation: z.string(),
  x: z.string(),
  y: z.string(),
  zIndex: z.string(),
  hidden: z.boolean(),
});

type FormValues = z.infer<typeof commonFieldsSchema>;

export function CommonFields({
  defaultFields,
  renderSpecificFields,
}: {
  defaultFields: FormValues;
  renderSpecificFields: ({ type }: { type?: MapNodeType }) => React.ReactNode;
}) {
  const form = useFormContext<FormValues>();

  return (
    <>
      <FormField
        control={form.control}
        name="type"
        defaultValue={defaultFields.type}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Тип ноды</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!!defaultFields.type}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Тип ноды" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={MAP_NODE_TYPES.COURSE}>Курс</SelectItem>
                <SelectItem value={MAP_NODE_TYPES.IMAGE}>Картинка</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hidden"
        defaultValue={defaultFields.hidden}
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="!mt-0">Скрыто</FormLabel>
          </FormItem>
        )}
      />

      {renderSpecificFields({ type: form.watch("type") })}

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="width"
          defaultValue={defaultFields.width}
          render={({ field }) => (
            <FormItem>
              <FormLabel>width</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          defaultValue={defaultFields.height}
          render={({ field }) => (
            <FormItem>
              <FormLabel>height</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
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
          defaultValue={defaultFields.scale}
          render={({ field }) => (
            <FormItem>
              <FormLabel>scale</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rotation"
          defaultValue={defaultFields.rotation}
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
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="x"
          defaultValue={defaultFields.x}
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
          defaultValue={defaultFields.y}
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
          defaultValue={defaultFields.zIndex}
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
