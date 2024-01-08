import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "./_actions";
import { useInvalidateProfileQuery } from "@/entities/profile/queries";
import { useSession } from "next-auth/react";

export function useUpdateProfileMutation() {
  const { update } = useSession();
  const invalidateProfileQuery = useInvalidateProfileQuery();
  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async (data) => {
      await invalidateProfileQuery(data.userId);
      await update({ user: data });
    },
  });
}
