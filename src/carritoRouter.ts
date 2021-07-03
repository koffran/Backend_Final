import express from 'express';
const router = express.Router();
import carrito from './carrito';
import Product from './product'
import {productsService} from '../src/productsRouter'

//let carts:carrito[] =[];
let now = new Date();
let d:Date = new Date(now.getFullYear(),now.getMonth(), now.getDate())
let cart:carrito = new carrito(1,d)

/*const searchById = (id:Number)=>{
    let found = carts.find(cart=> cart.id ===id)
    if(!found){
        return false;
    }
    return found
}*/
const searchProductInCart = (id:Number)=>{
    let found = cart.productos.find(product=> product.id ===id)
    if(!found){
        return false;
    }
    return found
}



/**
 * Permite listar todos los productos guardados en el carrito o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/:id?', (req,res) =>{
    if(req.params.id === undefined){
        cart.productos.length ===0 ?
        res.send({error: 'No hay producots cargados en el carrito'})
        : res.json(cart.productos)
    }
    else{
        let product = searchProductInCart(parseInt(req.params.id))
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
 * Agregar productos al carrito por ID
 * Usuarios y  administradores
 */
router.patch('/:id_producto', (req, res)=>{
    const prod = productsService.getProductById(parseInt(req.params.id_producto))
    cart.productos.push(prod)
    res.send(204)
})


/**
 * Borra un producto del carrito por su id de carrito 
 * Usuarios y administradores.
 */
router.delete('/:id',(req,res)=>{
    const prod = productsService.getProductById(parseInt(req.params.id))
    cart.productos = cart.productos.filter(producto => producto.id !== prod.id)
    res.send(204)
})



export default router;