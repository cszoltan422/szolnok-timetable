import TimetableResponse from "./../response/timetable.response";
import ErrorObjectBuilder from "./../util/errorobject.builder";
import * as startStopChecker from "./../util/startstop.checker";

export default function getTimetable(err: any, data: any, busName: string, busStop: string, startStop: string, occurrence: string): Promise<TimetableResponse> {
    return new Promise((resolve, reject) => {
        if (err) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Bad request")
                .setCode(400)
                .setErr(err)
                .setBusName(busName)
                .setBusStop(busStop)
                .setStartStop(startStop)
                .setOccurrence(occurrence)
                .build();
            reject(returnObject);
        }
        if (!data || !startStopChecker.checkIfStartStopValid(startStop, data, true)) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Not found")
                .setCode(404)
                .setErr("No data found!")
                .setBusName(busName)
                .setBusStop(busStop)
                .setStartStop(startStop)
                .setOccurrence(occurrence)
                .build();
            reject(returnObject);
        }

        let result;
        try {
            if (startStopChecker.checkIfSecond(startStop, data)) {
                result = buildResultOfTimetableQuery(data, 1, busStop, occurrence);
            } else {
                result = buildResultOfTimetableQuery(data, 0, busStop, occurrence);
            }
        } catch (buildError) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Not found")
                .setCode(404)
                .setErr("No data found!")
                .setBusName(busName)
                .setBusStop(busStop)
                .setStartStop(startStop)
                .setOccurrence(occurrence)
                .build();
            reject(returnObject);
        }
        resolve(result);
    });
}

const buildResultOfTimetableQuery = (data: any, index: number, busStop: string, occurrence: string): TimetableResponse => {
    const busName = data.busName;
    const startStop = data.busRoutes[index].startBusStop;
    const endStop = data.busRoutes[index].endBusStop;
    const busStopName = busStop;

    let foundOccurrences = 0;
    for (let i = 0; i < data.busRoutes[index].busStops.length; i++) {
        if (data.busRoutes[index].busStops[i].busStopName === busStop) {
            foundOccurrences++;
            if (!occurrence) {
                const timetable = data.busRoutes[index].busStops[i];
                return { busName, startStop, endStop, busStopName, occurrence, timetable };
            } else if (foundOccurrences === parseInt(occurrence)) {
                const timetable = data.busRoutes[index].busStops[i];
                return { busName, startStop, endStop, busStopName, occurrence, timetable };
            }
        }
    }
    throw "Error";
};