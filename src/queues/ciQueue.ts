import { Queue } from "bullmq";
import { REDIS_HOST } from "../config/env";

let ciQueue: Queue | null = null;

export const initCIQueue = (): Queue => {
  if (!ciQueue) {
    ciQueue = new Queue("ci", {
      connection: { host: REDIS_HOST, port: 6379 },
    });
    console.log("[ciQueue] initialized");
  }
  return ciQueue;
};

export const getCIQueue = (): Queue => {
  if (!ciQueue) {
    throw new Error(
      "ciQueue has not been initialized. Call initCIQueue() first."
    );
  }
  return ciQueue;
};
