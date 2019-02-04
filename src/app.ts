import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";
import busesRouter from "./controller/bus.controller";
import busStopsRouter from "./controller/busstops.controller";
import timetableRouter from "./controller/timetable.controller";

const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url).then(() => {
    logger.info("Successfully connected to database!");
  }, (err: mongoose.Error) => {
      logger.error(JSON.stringify(err));
    }
);

const app = express();

const expressLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info(`Method: ${req.method}, url: ${req.originalUrl}`);
    next();
};

app.use(expressLogger);
app.use("/bus", busesRouter);
app.use("/busStop", busStopsRouter);
app.use("/timetable", timetableRouter);

app.listen("8080", () => {
    logger.info(`Listening on port ${port}`);
});
