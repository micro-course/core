/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Cuid = string;
export type Cuid1 = string;

export interface Course {
  id: Cuid;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  image: string;
  dependencies?: Cuid1[];
  lessons: Cuid[];
}
