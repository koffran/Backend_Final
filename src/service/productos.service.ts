import Product from "../service/product";
import Files from "../persistencia/Files";
import ProductsMariaDB from "../persistencia/Databases/MariaDB/ProductsMariaDB";
import ProductsSqlite3 from "../persistencia/Databases/Sqlite3/ProductsSqlite3";

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
         if(this.productos.length ===0){
            //let productos = await ProductsMariaDB.selectProducts();   //USE MARIADB
            let productos = await ProductsSqlite3.selectProducts();     //USE SQLITE3



            productos.forEach((product:Product) => {
                this.productos.push(product)
            });
         }
        return this.productos;
    }

   async getProductById(id:Number){
        if(this.productos.length ===0){
            //let productos = await ProductsMariaDB.selectProducts(); //USE MARIADB
            let productos = await ProductsSqlite3.selectProducts(); //USE SQLITE3

            productos.forEach((product:Product) => {
                this.productos.push(product)
            });
        }
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

        //ProductsMariaDB.insertProduct(product);   // USE MARIA DB 
        ProductsSqlite3.insertProduct(product);     // USE SQLITE3
    }

    async updateProductById(data:any){
        const {precio} = data.body;
        try {
            const product = await this.getProductById(parseInt(data.params.id));
            product.precio = precio;
            this.productsTxt.save(this.productos)
           // ProductsMariaDB.updateById(product.productId, precio);    //USE MARIADB
            ProductsSqlite3.updateById(product.productId, precio);       //USE SQLITE3
            
            
            return product;  
        } catch (error) {            
            throw error
        }    
    }

    async deleteProductById(id:Number){
        const found = await this.getProductById(id);
        this.productos = this.productos.filter(producto => producto.productId !== found.productId)
        this.productsTxt.save(this.productos)
        //ProductsMariaDB.deleteById(found.productId)   // USE MARIADB
        ProductsSqlite3.deleteById(found.productId)     // USE SQLITE3
        
    }

}