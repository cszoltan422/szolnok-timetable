export default class ErrorObject {
    private message: string;
    private code: number;
    private err: string;
    private busName: string;
    private busStop: string;
    private startStop: string;
    private occurrence: string;

    constructor(message: string, code: number, err: string, busName: string, busStop: string, startStop: string, occurrence: string) {
        this.message = message;
        this.code = code;
        this.err = err;
        this.busName = busName;
        this.busStop = busStop;
        this.startStop = startStop;
        this.occurrence = occurrence;
    }

    get Message() {
        return this.message;
    }

    get Code() {
        return this.code;
    }

    get Err() {
        return this.err;
    }

    get BusName() {
        return this.busName;
    }

    get BusStop() {
        return this.busStop;
    }

    get StartStop() {
        return this.startStop;
    }

    get Occurrence() {
        return this.occurrence;
    }
}