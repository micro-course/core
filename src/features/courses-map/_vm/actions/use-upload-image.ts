import { getImageSizes, selectFile, validateFileSize } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { IMAGE_FILE_KEY, IMAGE_MAX_SIZE } from "../../_constants";
import { uploadImageAction } from "../../_actions/upload-image";

export const useUploadImage = ({
  onError,
  onSuccess,
  onImageSize,
}: {
  onError?: (type?: "big-size" | "unknown") => void;
  onSuccess?: (src: string) => void;
  onImageSize?: (params: { width: number; height: number }) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadImageAction,
  });

  const handleFileSelect = async () => {
    const file = await selectFile("image/*");

    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return onError?.("big-size");
    }

    const imageSizes = getImageSizes(file);

    const formData = new FormData();

    formData.set(IMAGE_FILE_KEY, file);

    try {
      const {
        image: { path },
      } = await mutateAsync(formData);

      onImageSize?.(await imageSizes);
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
