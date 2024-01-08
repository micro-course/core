export type UpdateProfileCommand = {
  userId: string;
  email: string;
  name?: string;
  image?: string;
};
