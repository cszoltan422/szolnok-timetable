import Server from "./server";
import BusController from "./bus/bus.controller";

const mongodbUrl = process.env.MONGODB_URL || "";
const port = process.env.PORT || "8080";

const server = new Server([
    new BusController()
]);

server.connectToDatabase(mongodbUrl);
server.addLogging();
server.startServer(port);