export const generateTestLink = ({
  callbackUrl,
  token,
  email,
}: {
  callbackUrl: string;
  token: string;
  email: string;
}) => {
  const url = new URL(`${window.location.origin}/api/auth/callback/email`);
  url.searchParams.set("callbackUrl", callbackUrl);
  url.searchParams.set("token", token);
  url.searchParams.set("email", email);
  return url.toString();
};
