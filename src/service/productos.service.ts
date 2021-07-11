import Product from "../service/product";
import Files from "../persistencia/Files";
const insertProducts = require("../persistencia/Databases/MariaDB/insert_products")
const getAll =require("../persistencia/Databases/MariaDB/select_products")
export class ProductsService{
    private productos:Product[] = [];
    private productsTxt:Files = new Files('src/persistencia/products.txt');


    private  getProductsFromFile() {     
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

     async getAllProducts(){
        let productos = await getAll();
        productos.forEach((product:Product) => {
            this.productos.push(product)
        });

        return this.productos;
    }

   async getProductById(id:Number){
        let productos = await getAll();
        productos.forEach((product:Product) => {
            this.productos.push(product)
        });
        let found = this.productos.find(product => product.productId ===id)        

        if(!found){
            throw new Error('Producto no encontrado')
        }

        return found
    }

    createProduct(data:any){
        let now = new Date();
        let d:Date = new Date(now.getFullYear(),now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(), now.getSeconds())
        const {nombre, descripcion, codigo, foto, precio, stock} = data;
        let product = new Product(d,nombre,descripcion,codigo,foto,precio,stock,this.productos.length+1)
        this.productos.push(product);
        this.productsTxt.save(this.productos)
        insertProducts(product);

    }

    async updateProductById(data:any){
        const {stock} = data.body;
        const product = await this.getProductById(parseInt(data.params.id));
        
        product.stock = stock;
        this.productsTxt.save(this.productos)
        return product;
    }

    async deleteProductById(id:Number){
        const found = await this.getProductById(id);
        this.productos = this.productos.filter(producto => producto.productId !== found.productId)
        this.productsTxt.save(this.productos)
    }

}