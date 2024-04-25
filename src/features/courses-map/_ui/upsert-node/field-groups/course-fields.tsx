import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useFormContext } from "react-hook-form";
import { CourseToAddSelect } from "../fields/course-to-add-select";

export const courseFieldsSchema = z.object({
  courseId: z.string().optional(),
});

type FormValues = z.infer<typeof courseFieldsSchema>;

export function CourseFields({defaultValues}: { defaultValues: FormValues }) {
  const form = useFormContext<FormValues>();

  return (
    <>
      <FormField
        control={form.control}
        name="courseId"
        defaultValue={defaultValues.courseId}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Курс</FormLabel>
            <FormControl>
              <CourseToAddSelect
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
