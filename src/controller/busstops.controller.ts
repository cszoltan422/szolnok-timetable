import express from "express";
import logger from "./../util/logger";

import { getBusStops, getAllBusesOfBusStop } from "./../dao/busstops.dao";

const busesRouter: express.Router = express.Router();

busesRouter.route("/:routename").get((req: express.Request, res: express.Response) => {
    getBusStops(req.params.routename, req.query.startStop)
        .then((data) => {
            logger.info(`Payload for request=[${req.method} ${req.originalUrl}] : ${JSON.stringify(data)}`);
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

busesRouter.route("/:busStopName/buses").get((req, res) => {
    getAllBusesOfBusStop(req.params.busStopName)
    .then((data) => {
        logger.info(`Payload for request=[${req.method} ${req.originalUrl}] : ${JSON.stringify(data)}`);
        res.statusCode = 200;
        res.send(data);
    }).catch((error) => {
        res.statusCode = error.code;
        res.send(error);
    });
});

export default busesRouter;