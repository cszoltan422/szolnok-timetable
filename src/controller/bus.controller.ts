import express from "express";
import { getBuses, getBusesByBusStop } from "./../dao/bus.dao";

const busesRouter: express.Router = express.Router();

busesRouter.get("/", (req: express.Request, res: express.Response) => {
    getBuses(req.query.q)
        .then((data: any) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err: any) => {
            res.statusCode = 500;
            res.send(err);
        });
});

busesRouter.get("/:busStop", (req: express.Request, res: express.Response) => {
    getBusesByBusStop(req.params.busStop)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
});

export default busesRouter;