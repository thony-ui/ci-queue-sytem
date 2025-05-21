import { Worker } from "bullmq";
import { runPipeline } from "../jobs/runPipeline";
import { REDIS_HOST } from "../config/env";
import { TPostCIWebHookInput } from "../modules/ci/domain/ci.validator";

export function startCIWorker(): Worker<TPostCIWebHookInput, void, "run-ci"> {
  const connection = { host: REDIS_HOST, port: 6379 };
  const worker = new Worker<TPostCIWebHookInput, void, "run-ci">(
    "ci",
    async (job) => {
      console.log(`[CI Worker] Starting job ${job.id}`);
      await runPipeline(job);
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`[CI Worker] Job ${job.id} completed successfully.`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[CI Worker] Job ${job?.id} failed:`, err.message);
  });

  return worker;
}
