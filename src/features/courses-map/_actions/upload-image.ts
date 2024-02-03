"use server";
import { z } from "zod";
import { BadRequest } from "@/shared/lib/errors";
import { fileStorage } from "@/shared/lib/file-storage";
import { IMAGE_FILE_KEY } from "../_constants";

const resultSchema = z.object({
  image: z.object({
    path: z.string(),
  }),
});

export const uploadImageAction = async (formData: FormData) => {
  const file = formData.get(IMAGE_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await fileStorage.uploadImage(file, "map/image");

  return resultSchema.parse({
    image: storedFile,
  });
};
