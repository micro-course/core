import { privateConfig } from "@/shared/config/private";
import { ContentApi } from "./content-api";
import { CacheStrategy } from "./lib/cache-strategy";
import { ContentQuery } from "./lib/content-query";
import { FileFetcher } from "./lib/file-fetcher";

export const contentApi = new ContentApi(
  {
    baseUrl: privateConfig.CONTENT_URL,
    token: privateConfig.CONTENT_TOKEN,
  },
  {
    cacheStrategy: new CacheStrategy(),
    contentQuery: new ContentQuery(),
    fileFetcher: new FileFetcher(),
  },
);
