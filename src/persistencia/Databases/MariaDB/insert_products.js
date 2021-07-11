const {options} = require('./MariaDB');
const knex= require('knex')(options);

 const insertProduct =(product)=>{
     console.log("entrando");
    knex('products').insert(product)
    .then(()=>console.log("Product inserted"))
}


module.exports= insertProduct