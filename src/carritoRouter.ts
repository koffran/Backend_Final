import express from 'express';
const router = express.Router();
import carrito from './carrito';

let carts:carrito[] =[];

const searchProductById = (id:Number)=>{
    let found = carts.find(cart=> cart.id ===id)
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
        carts.length ===0 ?
        res.send({error: 'No hay carritos cargados'})
        : res.json(carts)
    }
    else{
        let product = searchProductById(parseInt(req.params.id))
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
router.post('/:id_producto', (req, res)=>{
    res.send('Producto agregado al carrito ')
})


/**
 * Borra un producto del carrito por su aid de carrito 
 * Usuarios y administradores.
 */
router.delete('/:id',(req,res)=>{
    res.send('producto eliminado del carrito')
})



export default router;