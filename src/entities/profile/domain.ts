import { Session } from "next-auth";

export type Profile = {
  userId: string;
  email: string;
  name?: string;
  image?: string;
};

export const createProfileAbility = (session: Session | null) => ({
  canReadProfile: (userId: string) =>
    session && (session.user.id === userId || session.user.role === "ADMIN"),
  canUpdateProfile: (userId: string) =>
    session && (session.user.id === userId || session.user.role === "ADMIN"),
});

export const profileFromSession = (session: Session) => {
  return {
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  } satisfies Profile;
};
