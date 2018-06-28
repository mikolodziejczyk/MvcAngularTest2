import { Connection } from "./connection";

export class ConnectionVM {
    constructor(connection : Connection) {
        this.ppe = connection.ppe;
        this.meterCode = connection.meterCode;
        this.name = `<a href="">${connection.name}</a>`;
        this.tariff = connection.tariff;
        this.company = connection.company;
    }

    ppe: string;
    meterCode: string;
    name: string;
    tariff: string;
    company: string;
}