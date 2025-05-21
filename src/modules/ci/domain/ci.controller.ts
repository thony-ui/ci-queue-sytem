import type { NextFunction, Request, Response } from "express";
import { postCIWebHookValidator } from "./ci.validator";
import { getCIQueue } from "../../../queues/ciQueue";

export const postCIWebHookJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { repoUrl, branch = "main" } = req.body;
  try {
    const parsed = postCIWebHookValidator(repoUrl, branch);
    const queue = getCIQueue();

    await queue.add("run-ci", parsed);

    res.status(200).json({ message: "CI job triggered!" });
  } catch (error) {
    next(error);
  }
};
