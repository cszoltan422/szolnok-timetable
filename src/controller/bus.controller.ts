import express from "express";
import util from "util";
import logger from "../util/logger";
import { getBuses, getBusesByBusStop } from "./../dao/bus.dao";

const busesRouter: express.Router = express.Router();

/**
 * Fetches all buses from database with optional query to match bus name
 * @param q: <OPTIONAL> query param to narrow the buses
 */
busesRouter.get("/", (req: express.Request, res: express.Response) => {
    getBuses(req.query.q)
        .then((data: any) => {
            logger.info(`Returning for ${req.originalUrl} : ${util.inspect(data, {depth: 1, maxArrayLength: 1})}`);
            res.statusCode = 200;
            res.send(data);
        }).catch((err: any) => {
            res.statusCode = 500;
            res.send(err);
        });
});
/**
 * Fetches buses of one bus stop
 * @param busStop: Name of bus stop for the buses stopping there
 */
busesRouter.get("/:busStop", (req: express.Request, res: express.Response) => {
    getBusesByBusStop(req.params.busStop)
        .then((data) => {
            logger.info(`Returning for ${req.originalUrl} : ${util.inspect(data, {depth: 1, maxArrayLength: 1})}`);
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

export default busesRouter;