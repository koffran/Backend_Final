import Product from "../../../service/product";

const options = {
    client: 'sqlite3',
    connection: {
        filename:"./DB/mydb.sqlite"
    },
    useNullAsDefault: true
}
const knex = require('knex')(options);

knex.schema.createTable('productsSqlite3', (table:any)=>{
    table.increments('productId').primary().unsigned();
    table.string('nombre').notNullable();
    table.string('descripcion');
    table.codigo('string').notNullable();
    table.string('foto').notNullable();
    table.integer('precio').notNullable();
    table.integer('stock').defaultTo(0);
    table.timestamp('timeStamp').defaultTo(knex.fn.now());
})
  .then(()=> console.log("Table created with sqlite3"))
  .catch((err:Error) =>{console.log(err); throw err})


export default class ProductsSqlite3{
    

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