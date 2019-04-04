import { BusStopsResponse, BusStopWithBusesResponse } from "../stop/busstop.response";
import ErrorObjectBuilder from "./../util/errorobject.builder";
import * as startStopChecker from "./../util/startstop.checker";

function buildResultOfBusStopsQuery(data: any, index: number): BusStopsResponse {
    const busName = data.busName;
    const startStop = data.busRoutes[index].startBusStop;
    const endStop = data.busRoutes[index].endBusStop;
    const busStops = data.busRoutes[index].busStops.map((e: any) => e.busStopName);
    const numberOfRoutes = data.busRoutes.length;
    return { busName, startStop, endStop, busStops, numberOfRoutes };
}


export function getBusStops(err: any, data: any, busName: string, startStop: string): Promise<BusStopsResponse> {
    return new Promise((resolve, reject) => {
        if (err) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Bad request")
                .setCode(400)
                .setErr(err)
                .setBusName(busName)
                .setStartStop(startStop)
                .build();
            reject(returnObject);
            return;
        }
        if (!data || !startStopChecker.checkIfStartStopValid(startStop, data, false)) {
            const returnObject = new ErrorObjectBuilder()
            .setMessage("Not found")
            .setCode(404)
            .setErr("No data found!")
            .setBusName(busName)
            .setStartStop(startStop)
            .build();
            reject(returnObject);
            return;
        }
        let result: BusStopsResponse;
        if (startStopChecker.checkIfSecond(startStop, data)) {
            result = buildResultOfBusStopsQuery(data, 1);
        } else {
            result = buildResultOfBusStopsQuery(data, 0);
        }
        resolve(result);
    });
}

export function getAllBusesOfBusStop(err: any, data: any, query: string): Promise<Array<BusStopWithBusesResponse>> {
    return new Promise((resolve, reject) => {
        if (err) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Bad request")
                .setCode(400)
                .setErr(err)
                .setBusStop(query)
                .build();
        reject(returnObject);
        return;
        }
        if (!data) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Not found")
                .setCode(404)
                .setErr("No data found!")
                .setBusStop(query)
                .build();
            reject(returnObject);
            return;
        }
        if (!query) {
            query = "";
        }
        const filtered = data.filter((element: any) => element.busStopName.indexOf(query) + 1);
        resolve(filtered.map((e: any) => {
            const busStopName = e.busStopName;
            const buses = e.buses;
            return {busStopName, buses};
        }));
    });
}

export function getAllBusStopsWithBuses(err: any, data: any): Promise<Array<BusStopWithBusesResponse>> {
    return new Promise((resolve, reject) => {
        if (err || !data) {
            const returnObject = new ErrorObjectBuilder()
                .setMessage("Bad request")
                .setCode(400)
                .setErr(err)
                .build();
            reject(returnObject);
            return;
        }
        resolve(data.map((e: any) => {
            const busStopName = e.busStopName;
            const buses = e.buses;
            return {busStopName, buses};
        }));
    });
}