import { resolve4 } from 'dns';
import express from 'express';
const router = express.Router();
import Product from './product'
import {ProductsService} from './service/productos.service';
export const productsService = new ProductsService();

/**
 * Permite listar todos los productos o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/:id?', (req,res) =>{

    if(req.params.id === undefined){
         res.json(productsService.getAllProducts())
    }
    else{
        try {
            res.json(productsService.getProductById(parseInt(req.params.id)))
            
        } catch (error) {
            res.sendStatus(404)
            
        }

    }
})

/**
 * Incorpora productos al listado
 * Solo administradores
 */

router.post('/', (req, res)=>{
    productsService.createProduct(req.body);
    res.sendStatus(201)
})


/**
 * Actualiza un producto por ID
 * Solo administradores
 */
router.patch('/:id', (req,res)=>{
    productsService.updateProductById(req)
    res.sendStatus(204);
})


/**
 * Borra un producto por ID
 * Solo administradores.
 */
router.delete('/:id',(req,res)=>{
    productsService.deleteProductById(parseInt(req.params.id))
    res.sendStatus(200);
})



export default router;