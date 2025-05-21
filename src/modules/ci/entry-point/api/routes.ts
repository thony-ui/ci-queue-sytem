import { type Application, Router } from "express";
import { postCIWebHookJob } from "../../domain/ci.controller";

export function defineCIRoutes(expressApp: Application) {
  const router = Router();
  router.post("/webhook", postCIWebHookJob);
  expressApp.use("/ci", router);
}
