const {options} = require('./MariaDB');
const knex= require('knex')(options);

 const insertProduct =(product)=>{
    knex('products').insert(product)
    .then(()=>console.log("Product inserted"))
}


module.exports= insertProduct