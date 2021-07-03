export default class Product{
    timeStamp:Date;
    nombre:String;
    descripcion:String;
    codigo:String;
    foto:String;
    precio:Number;
    stock:Number;

    constructor(timeStamp:Date, nombre:String, descripcion:String,codigo:String, foto:String, precio:Number, stock:Number){
        this.timeStamp = timeStamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}