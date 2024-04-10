import { readFile } from "fs/promises";

export class LocalFileLoader {
  constructor() {}

  async fetchText(url: string) {
   return await readFile(url, { encoding: "utf-8" })
  }
}
