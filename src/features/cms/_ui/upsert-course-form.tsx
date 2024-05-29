import { UpsertCourseData } from "@/entities/course/_domain/course";
import { ImgUrl } from "@/kernel/domain/common";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseSlug } from "@/kernel/domain/course";
import { Textarea } from "@/shared/ui/textarea";
import { UploadImageField } from "@/kernel/lib/upload-image/upload-image-field";
import { createId } from "@/shared/lib/id";

const notEmpty = (value: string) => (value === "" ? undefined : value);

const formSchema = z
  .object({
    slug: z.string().transform(notEmpty),
    title: z.string().transform(notEmpty),
    thumbnail: z.string(),
    image: z.string(),
  })
  .pipe(
    z.object({
      slug: CourseSlug,
      title: z.string(),
      thumbnail: ImgUrl,
      image: ImgUrl,
    }),
  );

const defaultThumbnail =
  "https://dummyimage.com/600x400/000/10de5f&text=tumbnail";
const defaultImage = "https://dummyimage.com/1500x400/000/10de5f&text=image";

export function UpsertCourseForm({
  onSubmit,
  defaultValues,
  isLoading,
}: {
  isLoading: boolean;
  onSubmit: (data: UpsertCourseData) => void;
  defaultValues?: UpsertCourseData;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit((data) => {
    const parsed = formSchema.parse(data);
    if (defaultValues) {
      onSubmit({
        ...defaultValues,
        ...parsed,
      });
    } else {
      onSubmit({
        id: createId(),
        ...parsed,
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          name="slug"
          defaultValue={defaultValues?.slug}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="title"
          defaultValue={defaultValues?.title}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="thumbnail"
          defaultValue={defaultValues?.thumbnail ?? defaultThumbnail}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <UploadImageField
                  {...field}
                  scope="courses"
                  onError={() =>
                    form.setError("thumbnail", { message: "Invalid image" })
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          defaultValue={defaultValues?.image ?? defaultImage}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadImageField
                  {...field}
                  scope="courses"
                  onError={() =>
                    form.setError("thumbnail", { message: "Invalid image" })
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
