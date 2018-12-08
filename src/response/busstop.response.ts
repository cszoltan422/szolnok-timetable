export interface BusStopsResponse {
    busName: string;
    startStop: string;
    endStop: string;
    busStops: Array<string>;
    numberOfRoutes: number;
}

export interface BusStopWithBusesResponse {
    busStopName: string;
    buses: Array<string>;
}