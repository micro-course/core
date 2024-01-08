"use server";

import { getSession } from "@/entities/session/get-session.server";
import { getProfile } from "./use-cases";

export const getProfileAction = async (userId: string) => {
  try {
    const session = await getSession();

    return await getProfile({ session }, { userId });
  } catch (e) {
    return null;
  }
};
