import mongoose from "mongoose";

export type BusStopWithBusesModel = mongoose.Document & {
    busStopName: string,
    buses: string[],
    _class: string
};

const BusStopWithBusesSchema = new mongoose.Schema({
    busStopName: { type: String, required: true },
    buses: { type: Array, required: true },
    _class: String
}, {collection: "busStopWithBuses"});

const BusStopWithBuses = mongoose.model("busStopWithBuses", BusStopWithBusesSchema);
export default BusStopWithBuses;