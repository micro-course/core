import { useQueryClient } from "@tanstack/react-query";
import { getProfileAction } from "./actions";

export const updateProfileKey = "update-profile";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [updateProfileKey, "byId", userId],
  queryFn: async () => {
    return getProfileAction(userId);
  },
});

export const useInvalidateProfileQuery = () => {
  const queryClient = useQueryClient();
  return (userId: UserId) =>
    queryClient.invalidateQueries(getProfileQuery(userId));
};
