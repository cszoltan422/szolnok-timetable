export default interface TimetableResponse {
    busName: string;
    startStop: string;
    endStop: string;
    busStopName: string;
    occurrence: string;
    timetable: Array<any>;
}