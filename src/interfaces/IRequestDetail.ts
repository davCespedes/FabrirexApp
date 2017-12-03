export interface IRequestDetail {
    _id: string; //PK
    requestId: string;//FK
    productId: string;//FK
    quantity: number;
    subTotal: number;

}