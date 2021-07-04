import express from 'express'
import productsRouter from './router/productsRouter';
import carritoRouter from './router/carritoRouter';

const app = require('express')();
const http = require('http').createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/productos', productsRouter);
app.use('/carrito', carritoRouter)

const server = http.listen(process.env.PORT || 8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", (error:any) => console.log(`Error en el servidor: ${error}`))



