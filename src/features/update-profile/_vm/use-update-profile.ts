import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_actions/update-profile";
import { useInvalidateProfile } from "@/entities/user/_queries";
import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      await invalidateProfile(userId);
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
