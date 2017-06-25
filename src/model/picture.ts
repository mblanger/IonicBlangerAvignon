export class Picture {

    private _id: string;
    private _title: string;
    private _lat: number;
    private _long: number;

    constructor(id: string, lat: number, long: number) {
        this._id = id;
        this._lat = lat;
        this._long = long;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get lat(): number {
        return this._lat;
    }

    get long(): number {
        return this._long;
    }

    set title(value: string) {
        this._title = value;
    }

    set long(value: number) {
        this.long = value;
    }

    set lat(value: number) {
        this.lat = value;
    }
}