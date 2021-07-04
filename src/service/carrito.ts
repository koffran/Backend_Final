import Product from "./product";
import Files from "../persistencia/Files";

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