const {options} = require('./MariaDB');
const knex = require('knex')(options);


const  getAll = async  ()=>{
    return await knex.from('products').select("*")
}



module.exports= getAll;