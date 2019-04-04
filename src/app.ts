import Server from "./server";

const mongodbUrl = process.env.MONGODB_URL || "";
const port = process.env.PORT || "8080";

const server = new Server();

server.connectToDatabase(mongodbUrl);
server.addLogging();
server.startApplication(port);