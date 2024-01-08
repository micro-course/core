import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Profile } from "../domain";
import { cn } from "@/shared/ui/utils";
import { getProfielLetters } from "../vm";

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile: Profile;
  className?: string;
}) => {
  return (
    <Avatar className={cn("w-[40px] h-[40px]", className)}>
      <AvatarImage src={profile.image} />
      <AvatarFallback>{getProfielLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
