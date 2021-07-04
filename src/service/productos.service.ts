import Product from "../service/product";
import Files from "../persistencia/Files";

export class ProductsService{
    private productos:Product[] = [];
    private productsTxt:Files = new Files('src/persistencia/products.txt');


    private getProductsFromFile() {     
        try {
            this.productsTxt.read().then((val:any) => {
                if(val!=[]){                    
                    JSON.parse(val).forEach((element:any) => {                        
                        this.productos.push(element)
                    });
                }      
            })       
        } catch (error) {
            console.log(error);
            
        }   
    }

    getAllProducts(){
        this.getProductsFromFile()
        return this.productos;
    }

    getProductById(id:Number){
        let found = this.productos.find(product => product.id ===id)
        

        if(!found){
            throw new Error('Producto no encontrado')
        }

        return found
    }

    createProduct(data:any){
        let now = new Date();
        let d:Date = new Date(now.getFullYear(),now.getMonth(), now.getDate())
        const {nombre, descripcion, codigo, foto, precio, stock} = data;
        let product = new Product(d,nombre,descripcion,codigo,foto,precio,stock,this.productos.length+1)
        this.productos.push(product);
        this.productsTxt.save(this.productos)
    }

    updateProductById(data:any){
        const {stock} = data.body;
        const product = this.getProductById(parseInt(data.params.id));
        
        product.stock = stock;
        this.productsTxt.save(this.productos)
        return product;
    }

    deleteProductById(id:Number){
        const found = this.getProductById(id);
        this.productos = this.productos.filter(producto => producto.id !== found.id)
        this.productsTxt.save(this.productos)
    }

}