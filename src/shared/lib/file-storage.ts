import { S3Client, Tag } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import cuid from "cuid";
import { privateConfig } from "../config/private";

export type StoredFile = {
  id: string;
  name: string;
  path: string;
  prefix: string;
  type: string;
  eTag?: string;
};

class FileStorage {
  private s3Client = new S3Client({
    forcePathStyle: true,
    endpoint: privateConfig.S3_ENDPOINT,
    region: privateConfig.S3_REGION,
    credentials: {
      accessKeyId: privateConfig.S3_ACCESS_KEY_ID,
      secretAccessKey: privateConfig.S3_SECRET_ACCESS_KEY,
    },
  });

  async uploadImage(file: File, tag: string) {
    return this.upload(file, privateConfig.S3_IMAGES_BUCKET, tag);
  }

  async upload(file: File, bucket: string, tag: string): Promise<StoredFile> {
    const res = await new Upload({
      client: this.s3Client,
      params: {
        ACL: "public-read",
        Bucket: bucket,
        Key: `${tag}-${Date.now().toString()}-${file.name}`,
        Body: file,
      },
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    }).done();

    return {
      id: cuid(),
      name: file.name,
      type: file.type,
      path: `/storage/${bucket}/${res.Key}`,
      prefix: "/storage",
      eTag: res.ETag,
    };
  }
}

export const fileStorage = new FileStorage();
