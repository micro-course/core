import { Button } from "@/shared/ui/button";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";
import { HelpCircle } from "lucide-react";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const isProfile = variant !== "auth";
  return (
    <Layout
      logo={<Logo />}
      nav={<MainNav />}
      profile={isProfile && <Profile />}
      actions={
        <Button size={"icon"} variant={"ghost"} asChild>
          <a href="https://t.me/microcourses_support">
            <HelpCircle className="h-5 w-5" />
          </a>
        </Button>
      }
    />
  );
}
