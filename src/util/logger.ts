import winston from "winston";

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
            format: "YYYY-MM-DD hh:mm:ss"
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