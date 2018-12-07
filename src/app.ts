import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const db = process.env.MONGODB_DBNAME;
const port = "8080";

mongoose.connect(`mongodb://${username}:${password}@${host}:${mongoPort}/${db}`).then(() => {
    logger.info("Successfully connected to database!");
  }, (err: mongoose.Error) => {
      logger.error(JSON.stringify(err));
    }
);

const app = express();

app.listen("8080", () => {
    logger.info(`Listening on port ${port}`);
});