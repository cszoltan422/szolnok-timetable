import Controller from "../controller.interface";
import express from "express";
import BusDao from "./bus.dao";
import logger from "../util/logger";
import util from "util";

class BusController implements Controller {

    public path = "/bus";
    public router = express.Router();

    private busDao: BusDao;

    constructor(busDao: BusDao) {
        this.busDao = busDao;
        this.setupRoutes();
    }

    setupRoutes(): void {
        this.router.get("/", this.getBuses.bind(this));
        this.router.get("/:busStop", this.getBusesByBusStop.bind(this));
    }

    private getBuses(req: express.Request, res: express.Response) {
        this.busDao.getBuses(req.query.q)
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
        this.busDao.getBusesByBusStop(req.params.busStop)
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