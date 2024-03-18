"use server";
import { z } from "zod";
import { getUserService } from "../_services/get-user";
import { getAppSessionStrictServer } from "../session.server";
import { profileSchema } from "../_domain/schema";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await getUserService.exec({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
