import { blobToFile, dataURItoBlob } from "@/shared/lib/file";
import { fileStorage } from "@/shared/lib/file-storage";
import { injectable } from "inversify";

export type UploadImageCommand = {
  dataURI: string;
  name: string;
};

@injectable()
export class UploadImageService {
  constructor() {}
  async exec(command: UploadImageCommand): Promise<{ path: string }> {
    const blob = dataURItoBlob(command.dataURI);
    const file = blobToFile(blob, command.name);
    const storedFile = await fileStorage.uploadImage(file, "map/image");

    return {
      path: storedFile.path,
    };
  }
}
