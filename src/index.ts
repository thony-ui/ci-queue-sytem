import express from "express";
import bodyParser from "body-parser";
import { initCIQueue } from "./queues/ciQueue";
import { startCIWorker } from "./workers/ciWorker";
import { defineCIRoutes } from "./modules/ci";

const app = express();
app.use(bodyParser.json());
initCIQueue();
startCIWorker();
defineCIRoutes(app);
app.listen(3000, () => {
  console.log("CI listening on port 3000");
});
