import { UserId } from "../_domain/types";
import { getUserProfileAction } from "../_actions/get-user-profile";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getUserProfileAction({ userId }),
});
