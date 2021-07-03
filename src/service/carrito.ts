import Product from "./product";

export default class carrito{
    id:Number;
    timeStamp: Date;
    productos: Product[];

    constructor(id:Number, timeStamp:Date)
    {
        this.id = id;
        this.timeStamp=timeStamp;
        this.productos = [];
    }
}