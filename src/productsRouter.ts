import express from 'express';
const router = express.Router();
import Product from './product'

let productos:Product[] = [];

const searchById = (id:Number)=>{
    let found = productos.find(product => product.id ===id)
    if(!found){
        return false;
    }
    return found
}


/**
 * Permite listar todos los productos o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/:id?', (req,res) =>{

    if(req.params.id === undefined){
        productos.length ===0 ?
        res.send({error: 'No hay productos cargados'})
        : res.json(productos)
    }
    else{
        let product = searchById(parseInt(req.params.id))
        if(product != false)
        {
            res.json(product);
        }        
        else{
            res.sendStatus(404)
        }

    }
})

/**
 * Incorpora productos al listado
 * Solo administradores
 */
router.post('/', (req, res)=>{
    let now = new Date();
    let d:Date = new Date(now.getFullYear(),now.getMonth(), now.getDate())
    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
    let product = new Product(d,nombre,descripcion,codigo,foto,precio,stock,productos.length+1)
    productos.push(product);
    res.sendStatus(201)
})

/**
 * Actualiza un producto por ID
 * Solo administradores
 */
router.patch('/:id', (req,res)=>{
    let product = searchById(parseInt(req.params.id))
    if(product=== false){
        res.sendStatus(404);
    }
    else{
        const {stock} = req.body;
        product.stock = stock;
        res.sendStatus(204);
    }
})

/**
 * Borra un producto por ID
 * Solo administradores.
 */
router.delete('/:id',(req,res)=>{
    let product = searchById(parseInt(req.params.id))
    if(product === false){
        res.sendStatus(404);
    }{
        productos = productos.filter(product => product.id !== parseInt(req.params.id))
        res.sendStatus(200)
    }
})



export default router;