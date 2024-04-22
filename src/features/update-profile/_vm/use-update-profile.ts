import { useAppSession } from "@/kernel/lib/next-auth/client";
import { updateProfileApi } from "../_api";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const utils = updateProfileApi.useUtils();

  const { mutateAsync, isPending } =
    updateProfileApi.updateProfile.update.useMutation({
      async onSuccess(profile, { userId }) {
        await utils.updateProfile.get.invalidate({
          userId,
        });
        await updateSession({
          user: profile,
        });
      },
    });

  return {
    update: mutateAsync,
    isPending,
  };
};
