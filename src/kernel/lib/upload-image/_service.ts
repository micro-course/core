import { blobToFile, dataURItoBlob } from "@/shared/lib/file";
import { fileStorage } from "@/shared/lib/file-storage";

export type UploadImageCommand = {
  dataURI: string;
  name: string;
  scope: string;
};

export class UploadImageService {
  constructor() {}
  async exec(command: UploadImageCommand): Promise<{ path: string }> {
    const blob = dataURItoBlob(command.dataURI);
    const file = blobToFile(blob, command.name);
    const storedFile = await fileStorage.uploadImage(file, command.scope);

    return {
      path: storedFile.path,
    };
  }
}

export const uploadImageService = new UploadImageService();
