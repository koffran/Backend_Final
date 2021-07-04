import express,{Request,Response} from 'express'
import productsRouter from './router/productsRouter';
import carritoRouter from './router/carritoRouter';

const app = require('express')();
const http = require('http').createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/productos', productsRouter);
app.use('/carrito', carritoRouter)
app.get('*',(req:Request,res:Response)=>{
    res.status(404).send({error: -2, descripcion: `ruta ${req.path} methodo ${req.method} no implementada`})
})

const server = http.listen(process.env.PORT || 8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", (error:any) => console.log(`Error en el servidor: ${error}`))



