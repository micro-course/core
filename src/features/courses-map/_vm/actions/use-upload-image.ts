import { selectFile, validateFileSize } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { IMAGE_FILE_KEY, IMAGE_MAX_SIZE } from "../../_constants";
import { uploadImageAction } from "../../_actions/upload-image";

export const useUploadImage = ({
  onError,
  onSuccess,
}: {
  onError?: (type?: "big-size" | "unknown") => void;
  onSuccess?: (src: string) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadImageAction,
  });

  const handleFileSelect = async () => {
    const file = await selectFile("image/*");

    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return onError?.("big-size");
    }

    const formData = new FormData();

    formData.set(IMAGE_FILE_KEY, file);

    try {
      const {
        image: { path },
      } = await mutateAsync(formData);

      onSuccess?.(path);
    } catch (error) {
      onError?.("unknown");
    }
  };

  return {
    isPending,
    handleFileSelect,
  };
};
