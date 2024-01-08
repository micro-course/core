import { ToggleTheme } from "@/features/theme/toggle-theme.client";
import { AppLogo } from "./_ui/app-logo";
import { AppNav } from "./_ui/app-nav";
import { Layout } from "./_ui/layout";
import { Profile } from "./_ui/profile";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "public" | "private";
}) {
  return (
    <Layout
      nav={<AppNav />}
      logo={<AppLogo />}
      profile={variant !== "auth" && <Profile />}
      actions={<ToggleTheme />}
    />
  );
}
