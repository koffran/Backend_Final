import express from 'express';
const router = express.Router();
import carrito from '../service/carrito';
import Product from '../service/product'
import {productsService} from './productsRouter'
import { CarritoService } from '../service/carrito.service';
const carritoService = new CarritoService();

//let carts:carrito[] =[];
/*const searchById = (id:Number)=>{
    let found = carts.find(cart=> cart.id ===id)
    if(!found){
        return false;
    }
    return found
}*/




/**
 * Permite listar todos los productos guardados en el carrito o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/:id?', (req,res) =>{
    if(req.params.id === undefined){
        res.json(carritoService.getCartProducts());
    }
    else{
        try {
            res.json(carritoService.getCartProductById(parseInt(req.params.id)))
        } catch (error) {
            res.status(404).send(error.message)   
        }
    }
})


/**
 * Agregar productos al carrito por ID
 * Usuarios y  administradores
 */
router.patch('/:id_producto', (req, res)=>{
    try {
        carritoService.addProductById(parseInt(req.params.id_producto))
        res.sendStatus(204)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


/**
 * Borra un producto del carrito por su id de carrito 
 * Usuarios y administradores.
 */
router.delete('/:id',(req,res)=>{
    try {
        carritoService.deleteProductById(parseInt(req.params.id))
        res.sendStatus(204)
    } catch (error) {
        res.status(404).send(error.message)
    }
})



export default router;