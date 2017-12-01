export interface IProducts {
    _id?: string;//PK
    description: string;
    stock: number;
    price: number;
    image?:string;
}