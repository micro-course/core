import { privateConfig } from "@/shared/config/private";
import { ContentParser } from "./_lib/content-parser";
import { ContentApi } from "./_content-api";
import { LocalFileLoader } from "./_lib/local-file-loader";

export const contentApi = new ContentApi(
  privateConfig.CONTENT_URL,

  {
    contentParser: new ContentParser(),
    fileFetcher: new LocalFileLoader(),
  },
);
