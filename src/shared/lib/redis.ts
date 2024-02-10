import Redis from "ioredis";
import { privateConfig } from "../config/private";

export const redis = new Redis(privateConfig.REDIS_URL);
