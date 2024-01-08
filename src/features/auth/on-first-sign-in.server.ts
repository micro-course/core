import { Session } from "next-auth";
import { setInitialUserRole } from "./_use-cases";
import { userRepository } from "./_repository";

export const onFirstSignIn = async (session: Session) => {
  await setInitialUserRole(session.user);

  return userRepository.getUserByEmail(session.user.email);
};
