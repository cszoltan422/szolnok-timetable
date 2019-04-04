import mongoose from "mongoose";

export type BusModel = mongoose.Document & {
    busName: string,
    busRoutes: [{
        startBusStop: string,
        endBusStop: string,
        busStops: [{
            busStopName: string,
            workDaySchedule: BusArrival[],
            saturdaySchedule: BusArrival[],
            sundaySchedule: BusArrival[],
        }]
    }],
    _class: string
};

type BusArrival = {
    lowfloor: boolean,
    arrivalHour: number,
    arrivalMinute: number
};

const BusSchema = new mongoose.Schema({
    busName: { type: String, unique: true, required: true },
    busRoutes: [{
        startBusStop: {type: String, required: true},
        endBusStop: {type: String, required: true},
        busStops: [{
            busStopName: {type: String, required: true},
            workDaySchedule: {type: Array, required: true},
            saturdaySchedule: {type: Array, required: true},
            sundaySchedule: {type: Array, required: true},
        }]
    }],
    _class: String
}, {collection: "bus"});

const Bus = mongoose.model("bus", BusSchema);
export default Bus;