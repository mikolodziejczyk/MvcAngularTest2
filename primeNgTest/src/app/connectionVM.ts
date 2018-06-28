import { Connection } from "./connection";

export class ConnectionVM {
    constructor(connection : Connection) {
        this.id = connection.id;
        this.ppe = connection.ppe;
        this.meterCode = connection.meterCode;
        this.name = `<a href="">${connection.name}</a>`;
        this.tariff = connection.tariff;
        this.company = connection.company;
        this.startDate = new Date(connection.startDate);
        this.endDate = new Date(connection.endDate);
    }

    id: number;
    ppe: string;
    meterCode: string;
    name: string;
    tariff: string;
    company: string;
    startDate: Date;
    endDate: Date;
}