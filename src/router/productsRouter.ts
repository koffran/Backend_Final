import { resolve4 } from 'dns';
import express from 'express';
const router = express.Router();
import Product from '../service/product'
import {ProductsService} from '../service/productos.service';
export const productsService = new ProductsService();
const admin = false;

/**
 * Permite listar todos los productos o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/:id?',(req,res) =>{
    try {
        if(req.params.id === undefined){
            res.json(productsService.getAllProducts())
        }
        else{
        res.json(productsService.getProductById(parseInt(req.params.id)))
        }
    } catch (error) {
        res.status(404).send(error.message)
        
    }    
})


/**
 * Incorpora productos al listado
 * Solo administradores
 */
router.post('/',(req,res,next)=>{
    admin?next():res.send({"error":-1, "descripcion": `ruta ${req.path} metodo ${req.method} no autorizada`})
},
(req, res)=>{
   try {
        productsService.createProduct(req.body);
        res.sendStatus(201)   
   } catch (error) {
        res.status(404).send(error.message)    
   }
    
})


/**
 * Actualiza un producto por ID
 * Solo administradores
 */
router.patch('/:id',(req,res,next)=>{
    admin?next():res.send({"error":-1, "descripcion": `ruta ${req.path} metodo ${req.method} no autorizada`})
}, (req,res)=>{
    try {
        productsService.updateProductById(req)
         res.sendStatus(204);   
    } catch (error) {
        res.status(404).send(error.message)
    }
    
})


/**
 * Borra un producto por ID
 * Solo administradores.
 */
router.delete('/:id',(req,res,next)=>{
    admin?next():res.send({"error":-1, "descripcion": `ruta ${req.path} metodo ${req.method} no autorizada`})
},(req,res)=>{
    try {
        productsService.deleteProductById(parseInt(req.params.id))
        res.sendStatus(200);  
    } catch (error) {
        res.status(404).send(error.message) 
    }
    
})
export default router;