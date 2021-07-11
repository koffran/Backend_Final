const {options} = require('./MariaDB');
const knex = require('knex')(options);

knex.schema.createTable('products', table=>{
    table.increments('productId').primary().unsigned();
    table.string('nombre').notNullable();
    table.string('descripcion');
    table.codigo('string').notNullable();
    table.string('foto').notNullable();
    table.integer('precio').notNullable();
    table.integer('stock').defaultTo(0);
    table.timestamp('timeStamp').defaultTo(knex.fn.now());
})
  .then(()=> console.log("Table created"))
  .catch((err) =>{console.log(err); throw err})