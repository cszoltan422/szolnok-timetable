import ErrorObject from "./errorobject";

export default class ErrorObjectBuilder {

    private message!: string;
    private code!: number;
    private err!: string;
    private busName!: string;
    private busStop!: string;
    private startStop!: string;
    private occurrence!: string;

    constructor() {}

    setMessage(value: string): ErrorObjectBuilder {
        this.message = value;
        return this;
    }

    setCode(value: number): ErrorObjectBuilder {
        this.code = value;
        return this;
    }

    setErr(value: string): ErrorObjectBuilder {
        this.err = value;
        return this;
    }

    setBusName(value: string): ErrorObjectBuilder {
        this.busName = value;
        return this;
    }

    setBusStop(value: string): ErrorObjectBuilder {
        this.busStop = value;
        return this;
    }

    setStartStop(value: string): ErrorObjectBuilder {
        this.startStop = value;
        return this;
    }

    setOccurrence(value: string): ErrorObjectBuilder {
        this.occurrence = value;
        return this;
    }

    build(): ErrorObject {
        return new ErrorObject(this.message, this.code, this.err, this.busName, this.busStop, this.startStop, this.occurrence);
    }
}