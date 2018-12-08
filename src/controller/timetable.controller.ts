import express from "express";
import logger from "./../util/logger";
import getTimeTableOfBusStop from "./../dao/timetable.dao";

const timetableRouter = express.Router();

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