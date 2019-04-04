
import express from "express";
import util from "util";
import logger from "../util/logger";
import { getNews } from "./news.dao";


const newsRouter = express.Router();

/**
 * Fetches all news from the database
 */
newsRouter.get("/", (req: express.Request, res: express.Response) => {
    getNews()
        .then((data) => {
            logger.info(`Returning for ${req.originalUrl} : ${util.inspect(data, {depth: 1, maxArrayLength: 1})}`);
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

export default newsRouter;