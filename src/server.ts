import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";
import Controller from "./controller.interface";

class Server {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeControllers(controllers);
    }

    public connectToDatabase(mongodbUrl: string) {
        mongoose.connect(`${mongodbUrl}`).then(() => {
                logger.info("Successfully connected to database!");
            }, (err: mongoose.Error) => {
                logger.error(JSON.stringify(err));
            }
        );
    }

    public startApplication(port: string) {
        this.app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
            });
    }

    public addLogging() {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            logger.info(`Method: ${req.method}, url: ${req.originalUrl}`);
            next();
        });
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }
}

export default Server;