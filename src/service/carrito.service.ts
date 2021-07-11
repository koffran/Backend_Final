import carrito from "./carrito";
import { productsService } from "../router/productsRouter";
import Files from '../persistencia/Files';

export class CarritoService{
    private now = new Date();
    private d:Date = new Date(this.now.getFullYear(),this.now.getMonth(), this.now.getDate())
    private cart:carrito = new carrito(1,this.d)
    private cartTxt:Files = new Files('src/persistencia/cart.txt');

    private getProductsFromFile() {     
        try {
            this.cartTxt.read().then((val:any) => {
                if(val!=[]){
                   // console.log(val);
                    
                    JSON.parse(val).forEach((element:any) => {
                        const {id} = element;
                        console.log(id);
                        
                        this.addProductById(id) 
                    });
                }      
            })       
        } catch (error) {
            console.log(error);
            
        }   
    }

    getCartProducts(){
        this.getProductsFromFile()
        
        return this.cart.productos;
    }

    getCartProductById = (id:Number)=>{
        let found = this.cart.productos.find(product=> product.productId ===id)
        if(!found){
            throw new Error('Producto no encontrado')
        }
        return found
    }

    addProductById =(id_producto:Number)=>{
        const prod = productsService.getProductById(id_producto)
        this.cart.productos.push(prod)
        this.cartTxt.save(this.cart.productos)
    }

    deleteProductById =(id_producto:Number)=>{
        const prod = productsService.getProductById(id_producto)
        this.cart.productos = this.cart.productos.filter(producto => producto.productId !== prod.productId)
        this.cartTxt.save(this.cart.productos)        
    }

    




}