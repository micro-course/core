import {
  fileToDataURI,
  getImageSizes,
  selectFile,
  validateFileSize,
} from "@/shared/lib/file";
import { IMAGE_MAX_SIZE } from "./const";
import { uploadImageApi } from "./api";

export const useUploadImage = ({
  onError,
  onSuccess,
  onImageSize,
  scope,
}: {
  scope: string;
  onError?: (type?: "big-size" | "unknown") => void;
  onSuccess?: (src: string) => void;
  onImageSize?: (params: { width: number; height: number }) => void;
}) => {
  const uploadImageMutation = uploadImageApi.uploadImage.upload.useMutation();

  const handleFileSelect = async () => {
    const file = await selectFile("image/*");

    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return onError?.("big-size");
    }

    const imageSizes = getImageSizes(file);

    try {
      const { path } = await uploadImageMutation.mutateAsync({
        ...(await fileToDataURI(file)),
        scope,
      });

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
