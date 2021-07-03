import express from 'express';
const router = express.Router();


/**
 * Permite listar todos los productos o uno por su ID
 * disponible para usuarios y administradores
 */
router.get('/listar/:id?', (req,res) =>{
    res.send({error:`no hay productos cargados para el id: ${req.params.id}`})
})

/**
 * Incorpora productos al listado
 * Solo administradores
 */
router.post('/agregar', (req, res)=>{
    res.send('agregado')
})

/**
 * Actualiza un producto por ID
 * Solo administradores
 */
router.patch('/actualizar/:id', (req,res)=>{
    res.send('actualizado')
})

/**
 * Borra un producto por ID
 * Solo administradores.
 */
router.delete('/borrar/:id',(req,res)=>{
    res.send('eliminado')
})



export default router;