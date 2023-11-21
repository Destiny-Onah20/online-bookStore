import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  } else {
    throw new Error("Redis not connecting.")
  }
};

const redis = new Redis(getRedisUrl());

export default redis;