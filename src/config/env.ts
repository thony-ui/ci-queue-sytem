import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  REDIS_HOST: z.string().default("localhost"),
  WORKDIR: z.string().default("/tmp"),
});

const env = envSchema.parse(process.env);
export const { REDIS_HOST, WORKDIR } = env;
