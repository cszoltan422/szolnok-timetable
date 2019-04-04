import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";
import busesRouter from "./bus/bus.controller";
import busStopsRouter from "./stop/busstops.controller";
import timetableRouter from "./timetable/timetable.controller";
import newsRouter from "./controller/news.controller";

const database_url = process.env.MONGODB_URL;
const port = process.env.PORT || 8080;

mongoose.connect(`${database_url}`).then(() => {
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
app.use("/news", newsRouter);

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});
