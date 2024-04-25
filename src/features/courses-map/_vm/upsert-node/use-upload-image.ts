import {
  fileToDataURI,
  getImageSizes,
  selectFile,
  validateFileSize,
} from "@/shared/lib/file";
import { IMAGE_MAX_SIZE } from "../../_constant";
import { coursesMapApi } from "../../_api";

export const useUploadImage = ({
  onError,
  onSuccess,
  onImageSize,
}: {
  onError?: (type?: "big-size" | "unknown") => void;
  onSuccess?: (src: string) => void;
  onImageSize?: (params: { width: number; height: number }) => void;
}) => {
  const uploadImageMutation =
    coursesMapApi.coursesMap.uploadImage.useMutation();
  const handleFileSelect = async () => {
    const file = await selectFile("image/*");

    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return onError?.("big-size");
    }

    const imageSizes = getImageSizes(file);

    try {
      const { path } = await uploadImageMutation.mutateAsync(
        await fileToDataURI(file),
      );

      onImageSize?.(await imageSizes);
      onSuccess?.(path);
    } catch (error) {
      onError?.("unknown");
    }
  };

  return {
    isPending: uploadImageMutation.isPending,
    handleFileSelect,
  };
};
