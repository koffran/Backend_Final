import carrito from "../carrito";
import { productsService } from "../productsRouter";

export class CarritoService{
    private now = new Date();
    private d:Date = new Date(this.now.getFullYear(),this.now.getMonth(), this.now.getDate())
    private cart:carrito = new carrito(1,this.d)


    getCartProducts(){
        return this.cart.productos;
    }

    getCartProductById = (id:Number)=>{
        let found = this.cart.productos.find(product=> product.id ===id)
        if(!found){
            throw new Error('Producto no encontrado')
        }
        return found
    }

    addProductById =(id_producto:Number)=>{
        const prod = productsService.getProductById(id_producto)
        this.cart.productos.push(prod)
    }

    deleteProductById =(id_producto:Number)=>{
        const prod = productsService.getProductById(id_producto)
        this.cart.productos = this.cart.productos.filter(producto => producto.id !== prod.id)
    }

    




}