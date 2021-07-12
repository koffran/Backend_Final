import Product from "../../../service/product";

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'productsdb'
    }
}
const knex = require('knex')(options);

export default class ProductsMariaDB{

    static insertProduct =(product:Product)=>{
        knex('products').insert(product)
        .then(()=>console.log("Product inserted"))
    }

    static selectProducts = async  ()=>{
        return await knex.from('products').select("*")
    }

    static updateById = async  (id:Number,newPrecio:Number)=>{
        return await knex.from('products').where('productId', id).update({precio:newPrecio})
    }

    static deleteById = async  (id:Number)=>{
        return await knex.from('products').where('productId', id).del()
    }
}
