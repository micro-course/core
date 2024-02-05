"use server";
import { z } from "zod";
import { BadRequest } from "@/shared/lib/errors";
import { fileStorage } from "@/shared/lib/file-storage";
import { IMAGE_FILE_KEY } from "../_constants";
import { getAppSessionStrictServer } from "@/entities/user/session.server";

const resultSchema = z.object({
  image: z.object({
    path: z.string(),
  }),
});

export const uploadImageAction = async (formData: FormData) => {
  await getAppSessionStrictServer();

  const file = formData.get(IMAGE_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await fileStorage.uploadImage(file, "map/image");

  return resultSchema.parse({
    image: storedFile,
  });
};
