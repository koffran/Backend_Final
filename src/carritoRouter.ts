import express from 'express';
const router = express.Router();


/**
 * Permite listar todos los productos guardados en el carrito o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/listar/:id?', (req,res) =>{
    res.send({error:`no hay productoen el carrito para el id: ${req.params.id}`})
})

/**
 * Agregar productos al carrito por ID
 * Usuarios y  administradores
 */
router.post('/agregar/:id_producto', (req, res)=>{
    res.send('Producto agregado al carrito ')
})


/**
 * Borra un producto del carrito por su aid de carrito 
 * Usuarios y administradores.
 */
router.delete('/borrar/:id',(req,res)=>{
    res.send('producto eliminado del carrito')
})



export default router;