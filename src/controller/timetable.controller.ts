import express from "express";
import logger from "./../util/logger";
import getTimeTableOfBusStop from "./../dao/timetable.dao";

const timetableRouter = express.Router();

/**
 * Fetches all the timetable of one bus stop
 * @param busName: The name of the bus
 * @param startStop: The start stop of the bus to set the corresponding route
 * @param busStop: The bus stop for the timetable
 * @param occurrence: <OPTIONAL> Set which timetable to get for the busStop, which occurrence
 */
timetableRouter.get("/:busName/:startStop/:busStop", (req: express.Request, res: express.Response) => {
    getTimeTableOfBusStop(req.params.busName, req.params.startStop, req.params.busStop, req.query.occurrence)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
            logger.info(`Payload for request=[${req.method} ${req.originalUrl}] : ${JSON.stringify(data)}`);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

export default timetableRouter;