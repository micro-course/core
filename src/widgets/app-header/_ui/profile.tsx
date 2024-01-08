"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import { useSession } from "next-auth/react";
import { SignInButton } from "@/features/auth/sign-in-button.client";
import { useSignOut } from "@/features/auth/use-sign-out.client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { profileFromSession } from "@/entities/profile/domain";
import { ProfileAvatar } from "@/entities/profile/ui/profile-avatar";
import { getProfileDisplayName } from "@/entities/profile/vm";

export function Profile() {
  const session = useSession();
  const signOut = useSignOut();

  if (session.status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (session.status === "unauthenticated") {
    return <SignInButton />;
  }

  if (session.status === "authenticated") {
    const profile = profileFromSession(session.data);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-px rounded-full self-center h-8 w-8"
          >
            <ProfileAvatar profile={profile} className="w-8 h-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2 ">
          <DropdownMenuLabel>
            <p>Мой аккаунт</p>
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
              {getProfileDisplayName(profile)}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuGroup></DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${session.data?.user.id}`}>
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut.signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выход</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
