import Controller from "../controller.interface";
import express from "express";
import { getBuses, getBusesByBusStop } from "./bus.dao";
import logger from "../util/logger";
import util from "util";

class BusController implements Controller {

    public path = '/bus';
    public router = express.Router();

    constructor() {
        this.setupRoutes();
    }

    setupRoutes(): void {
        this.router.get("/", this.getBuses);
        this.router.get("/:busStop", this.getBusesByBusStop);
    }

    private getBuses(req: express.Request, res: express.Response) {
        getBuses(req.query.q)
            .then((data: any) => {
                logger.info(`Returning for ${req.originalUrl} : ${util.inspect(data, {depth: 1, maxArrayLength: 1})}`);
                res.statusCode = 200;
                res.send(data);
            }).catch((err: any) => {
            res.statusCode = 500;
            res.send(err);
        });
    }

    private getBusesByBusStop(req: express.Request, res: express.Response) {
        getBusesByBusStop(req.params.busStop)
            .then((data) => {
                logger.info(`Returning for ${req.originalUrl} : ${util.inspect(data, {depth: 1, maxArrayLength: 1})}`);
                res.statusCode = 200;
                res.send(data);
            }).catch((error) => {
            res.statusCode = error.code;
            res.send(error);
        });
    }

}

export default BusController;