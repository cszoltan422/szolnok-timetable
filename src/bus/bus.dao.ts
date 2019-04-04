import Bus from "./bus.model";
import BusResponse from "./bus.response";
import logger from "../util/logger";
import ErrorObjectBuilder from "../util/errorobject.builder";

class BusDao {

    constructor() {  }

    public getBuses(query: String): Promise<Array<BusResponse>> {
        return new Promise((resolve, reject) => {
            logger.info(`Fetching all buses with query=[${query}]`);
            Bus.find({}).select({ "busName": 1, "busRoutes.startBusStop": 1, "busRoutes.endBusStop": 1, "_id": 0 }).exec((err: any, data: any) => {
                if (err || !data) {
                    logger.error(`Can\'t fetch buses! Error: [ ${err} ], data: [ ${data} ]`);
                    const returnObject = new ErrorObjectBuilder()
                        .setMessage("Internal Server Error")
                        .setCode(500)
                        .setErr(err)
                        .build();
                    reject(returnObject);
                    return;
                }
                if (!query) {
                    query = "";
                }
                const filtered = data.filter((element: any) => element.busName.indexOf(query) + 1);
                resolve(filtered.map((e: any) => {
                    const busName = e.busName;
                    const startBusStop = e.busRoutes[0].startBusStop;
                    const endBusStop = e.busRoutes[0].endBusStop;
                    return {busName, startBusStop, endBusStop};
                }));
            });
        });
    }

    public getBusesByBusStop(busStop: string): Promise<BusResponse> {
        return new Promise((resolve, reject) => {
            logger.info(`Fetching buses of busStop=[${busStop}]`);
            Bus.find({"busRoutes.busStops": {$elemMatch: { busStopName: busStop}}}).select({ "busName": 1, "busRoutes.startBusStop": 1, "busRoutes.endBusStop": 1, "_id": 0 }).exec((err: any, data: any) => {
                if (err) {
                    logger.error(`Can\'t fetch buses with busStop=[${busStop}] Error: [ ${err} ], data: [ ${data} ]`);
                    const returnObject = new ErrorObjectBuilder()
                        .setMessage("Internal Server Error")
                        .setCode(500)
                        .setErr(err)
                        .setBusStop(busStop)
                        .build();
                    reject(returnObject);
                    return;
                }
                if (!data ) {
                    const returnObject = new ErrorObjectBuilder()
                        .setMessage("Not found")
                        .setCode(404)
                        .setErr("No data found!")
                        .setBusStop(busStop)
                        .build();
                    reject(returnObject);
                    return;
                }
                resolve(data.map((e: any) => {
                    const busName = e.busName;
                    const startBusStop = e.busRoutes[0].startBusStop;
                    const endBusStop = e.busRoutes[0].endBusStop;
                    return {busName, startBusStop, endBusStop};
                }));
            });
        });
    }
}

export default BusDao;
