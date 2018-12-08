import express from "express";
import logger from "./../util/logger";

import { getBusStops, getAllBusStops } from "./../dao/busstops.dao";

const busesRouter: express.Router = express.Router();

/**
 * Fetches all busStops with buses stopping there, with optional query to match busStopName
 * @param q: <OPTIONAL> query param to narrow the busStops
 */
busesRouter.route("/").get((req: express.Request, res: express.Response) => {
    getAllBusStops(req.query.q)
    .then((data) => {
        res.statusCode = 200;
        res.send(data);
    }).catch((error) => {
        res.statusCode = error.code;
        res.send(error);
    });
});

/**
 * Fetches busStops of one bus with optional startStop to set the corresponding bus route
 * @param routename: Name of the bus name for it's stops
 * @param startStop: <OPTIONAL> to set the corresponding bus route if there's multiple
 */
busesRouter.route("/:routename").get((req: express.Request, res: express.Response) => {
    getBusStops(req.params.routename, req.query.startStop)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
            logger.info(`Payload for request=[${req.method} ${req.originalUrl}] : ${JSON.stringify(data)}`);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

export default busesRouter;