import Bus from "./../model/bus.model";
import logger from "./../util/logger";
import TimetableResponse from "./../response/timetable.response";
import getTimetable from "./../transformer/timetable.transformer";

export default function getTimeTableOfBusStop(busName: string, startStop: string, busStop: string, occurrence: string): Promise<TimetableResponse> {
    return new Promise((resolve, reject) => {
        logger.info(`Fetching timetable of [${busName}] from [${startStop}] in busStop [${busStop}] with occurrence [${occurrence}]`);
        Bus.findOne({ "busName": busName }, (err: any, data: any) => {
            getTimetable(err, data, busName, busStop, startStop, occurrence)
            .then((timetable) => {
                resolve(timetable);
            }).catch((error) => {
                logger.error(`Can\'t fetch timetable of bus: [${busName}] from: [${startStop}] in busStop: [${busStop}] with occurrence: [${occurrence}]! Error: [${err}], data: [${data}]`);
                error.code = error.code || 500;
                reject(error);
            });
        });
    });
}