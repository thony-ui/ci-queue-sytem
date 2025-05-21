import path from "path";

import fs from "fs";
import { exec } from "child_process";
import simpleGit from "simple-git";
import { WORKDIR } from "../config/env";
import { Job } from "bullmq";
import { TPostCIWebHookInput } from "../modules/ci/domain/ci.validator";

export async function runPipeline(job: Job<TPostCIWebHookInput, any, string>) {
  const { repoUrl, branch } = job.data;
  const repoName = (repoUrl.split("/").pop() || "").replace(".git", "");
  const clonePath = path.join(WORKDIR, `${repoName}-${Date.now()}`);

  fs.mkdirSync(clonePath, { recursive: true });

  const git = simpleGit();
  await git.clone(repoUrl, clonePath, ["--branch", branch || "main"]);

  console.log(`[CI] Cloned ${repoUrl} into ${clonePath}`);

  return new Promise((resolve, reject) => {
    exec(
      `npm install && npm test`,
      { cwd: clonePath },
      (err, stdout, stderr) => {
        if (err) {
          console.error("[CI] Build failed:\n", stderr);
          return reject(new Error(stderr));
        }
        console.log("[CI] Build output:\n", stdout);
        resolve(stdout);
      }
    );
  });
}
