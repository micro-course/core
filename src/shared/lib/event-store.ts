import { EventStoreDBClient } from "@eventstore/db-client";
import { privateConfig } from "../config/private";

export const eventStoreDb = new EventStoreDBClient({
  endpoint: privateConfig.EVENT_STORE_DB_URL,
});
