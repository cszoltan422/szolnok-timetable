import winston from "winston";
import moment from "moment";

const timestampFormat = () => moment().format("YYYY-MM-DD hh:mm:ss").trim();

const logformat = winston.format.printf((info: any) => {
    const logEntry = {
        timestamp: info.timestamp,
        level: info.level,
        message: info.message
    };
    return JSON.stringify(logEntry);
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: timestampFormat()
        }),
        logformat
    ),
    transports: [
        new winston.transports.Console({
            level: "info",
        })
    ]
});

export default logger;