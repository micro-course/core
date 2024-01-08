import { Button } from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { selectFile } from "@/shared/lib/file";
import { Spinner } from "@/shared/ui/spinner";
import { uploadProfileImageAction } from "../_actions";
import { ProfileAvatar } from "@/entities/profile/ui/profile-avatar";
import { Profile } from "@/entities/profile/domain";

export function AvatarField({
  value,
  onChange,
  profile,
}: {
  value?: string;
  onChange: (value?: string) => void;
  profile: Profile;
}) {
  const uploadImage = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return uploadProfileImageAction(formData);
    },
    onSuccess: (data) => {
      if (data) {
        onChange(data);
      }
    },
  });

  const handleClick = () => {
    selectFile("image/*").then((file) => {
      if (file) {
        uploadImage.mutate(file);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      disabled={uploadImage.isPending}
      onClick={handleClick}
      type="button"
    >
      {uploadImage.isPending && (
        <div className="inset-0 absolute flex items-center justify-center z-10">
          <Spinner className="w-10 h-10" label="Загрузка новой аватарки" />
        </div>
      )}
      <ProfileAvatar
        className="w-full h-full"
        profile={{ ...profile, image: value }}
      />
    </Button>
  );
}
