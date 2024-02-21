import { privateConfig } from "@/shared/config/private";
import { FileFetcher } from "./_lib/file-fetcher";
import { ContentParser } from "./_lib/content-parser";
import { ContentApi } from "./_content-api";

export const contentApi = new ContentApi(
  privateConfig.CONTENT_URL,

  {
    contentParser: new ContentParser(),
    fileFetcher: new FileFetcher(privateConfig.CONTENT_TOKEN),
  },
);
