import { bundleMDX } from "mdx-bundler";

export const compileMDX = (file: string) => bundleMDX({ source: file });
