export function checkIfSecond(startStop: string, data: any): boolean {
    return startStop && data.busRoutes[1] && data.busRoutes[1].startBusStop === startStop;
}

export function checkIfStartStopValid(startStop: string, data: any, startStopRequired: boolean): boolean {
    if (startStopRequired && !startStop) {
        return false;
    }
    if (!startStopRequired && !startStop) {
        return true;
    }
    return data.busRoutes[0].startBusStop === startStop || (data.busRoutes[1] && data.busRoutes[1].startBusStop === startStop);
}