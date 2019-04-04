import Server from "./server";
import BusController from "./bus/bus.controller";
import BusDao from "./bus/bus.dao";

const mongodbUrl = process.env.MONGODB_URL || "";
const port = process.env.PORT || "8080";

const busDao = new BusDao();
const server = new Server([
    new BusController(busDao)
]);

server.connectToDatabase(mongodbUrl);
server.addLogging();
server.startServer(port);