"use server";
import { getSession } from "@/entities/session/get-session.server";
import { imageStorage } from "@/shared/lib/image-storage";
import { UpdateProfileCommand } from "./_domain";
import { updateProfile } from "./_use-cases";

export const updateProfileAction = async (data: UpdateProfileCommand) => {
  const session = await getSession();

  return updateProfile({ session }, data);
};

export const uploadProfileImageAction = async (formData: FormData) => {
  const res = await imageStorage.uploadImage(formData.get("image") as File);

  return res.path;
};
