import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
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
}

export default Server;