import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useFormContext } from "react-hook-form";
import { ImageField } from "../fields/image-field";

export const imageFieldsSchema = z.object({
  src: z.string(),
  width: z.string().optional(),
  height: z.string().optional(),
});

type FormValues = z.infer<typeof imageFieldsSchema>;

export function ImageFields({ defaultValues }: { defaultValues: FormValues }) {
  const form = useFormContext<FormValues>();

  return (
    <>
      <FormField
        control={form.control}
        name="src"
        defaultValue={defaultValues.src}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Изображение</FormLabel>
            <FormControl>
              <ImageField
                src={field.value}
                onChange={field.onChange}
                onChangeSize={(data) => {
                  form.setValue("width", data.width.toString());
                  form.setValue("height", data.height.toString());
                }}
                onError={(type) =>
                  form.setError("src", {
                    message:
                      type === "big-size"
                        ? "Максимальный размер 5 МБ"
                        : "Ошибка загрузки",
                  })
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
