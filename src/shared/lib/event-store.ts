import { EventStoreDBClient } from "@eventstore/db-client";
import { privateConfig } from "../config/private";

export const eventStoreDb = EventStoreDBClient.connectionString(
  privateConfig.EVENT_STORE_DB_URL,
);
