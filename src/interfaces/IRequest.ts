export interface IRequest {
    _id: string;//PK
    clientId: string;//FK
    employeeId: string;//FK
    destination: string;
    date: string;
    total:number;
}