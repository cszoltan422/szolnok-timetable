import Bus from "../bus/bus.model";
import BusStopWithBuses from "./busStopsWithBuses.model";
import { BusStopsResponse, BusStopWithBusesResponse } from "./busstop.response";
import logger from "../util/logger";
import * as busStopsTransformer from "../transformer/busstops.transformer";

export function getBusStops(busName: string, startStop: string): Promise<BusStopsResponse> {
    return new Promise((resolve, reject) => {
        logger.info(`Fetching busStops of [${busName}] with startStop [${startStop}]`);
        Bus.findOne({ "busName": busName }, (err: any, data: any) => {
            busStopsTransformer.getBusStops(err, data, busName, startStop)
            .then((busStops) => {
                resolve(busStops);
            }).catch((error) => {
                logger.error(`Can\'t fetch busStops of bus [${busName}] and startStop [${startStop}]! Error: [${err}], data: [${data}]`);
                error.code = error.code || 500;
                reject(error);
            });
        });
    });
}

export function getAllBusStops(busStopName: string): Promise<Array<BusStopWithBusesResponse>> {
    return new Promise((resolve, reject) => {
        logger.info(`Fetching all buses for busStop=[${busStopName}]`);
        BusStopWithBuses.find({}).select({"busStopName": 1, "buses": 1, "_id": 0}).sort({busStopName: 1}).exec((err: any, data: any) => {
            busStopsTransformer.getAllBusesOfBusStop(err, data, busStopName)
            .then((busStopsWithBuses) => {
                resolve(busStopsWithBuses);
            }).catch((error) => {
                logger.error(`Can't fetch all buses for busStop=[${busStopName}]`);
                error.code = error.code || 500;
                reject(error);
            });
        });
    });
}