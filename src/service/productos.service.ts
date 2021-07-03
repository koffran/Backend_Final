import Product from "../product";

export class ProductsService{
    private productos:Product[] = [];

    getAllProducts(){
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
    }

    updateProductById(data:any){
        const {stock} = data.body;
        const product = this.getProductById(parseInt(data.params.id));
        
        product.stock = stock;
        return product;
    }

    deleteProductById(id:Number){
        const found = this.getProductById(id);
        this.productos = this.productos.filter(producto => producto.id !== found.id)
    }

}