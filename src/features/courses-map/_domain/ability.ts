import { SessionEntity } from "@/entities/user/session";
import { ROLES } from "@/entities/user/user";

export const createMapAbility = (session: SessionEntity) => ({
  canMangeNodes: () => session.user.role === ROLES.ADMIN,
  canViewHidenNodes: () => session.user.role === ROLES.ADMIN,
  canViewMap: () => true,
});

export type MapAbility = ReturnType<typeof createMapAbility>;
