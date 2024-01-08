import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import cuid from "cuid";
import { lookup } from "mime-types";

export type Image = {
  id: string;
  name: string;
  path: string;
  prefix: string;
  type: string;
  eTag: string;
};

class ImageStorage {
  private backet: string = process.env.S3_IMAGES_BUCKET ?? "";
  private s3Client = new S3Client({
    forcePathStyle: true,
    endpoint: process.env.S3_ENDPOINT ?? "",
    region: "eu-west-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
    },
  });

  async uploadImage(file: File) {
    const res = await new Upload({
      client: this.s3Client,
      params: {
        ACL: "public-read",
        Bucket: this.backet,
        Key: `${Date.now().toString()}-${file.name}`,
        Body: file,
      },
      tags: [], // optional tags
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    }).done();

    return {
      id: cuid(),
      name: file.name,
      type: lookup(file.name) || "",
      path: `/images/${this.backet}/${res.Key}`,
      prefix: "/images",
      eTag: res.ETag,
    } as Image;
  }
}

export const imageStorage = new ImageStorage();
