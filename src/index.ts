import express, {Request, Response} from 'express'
import Files from './Files'
import productsRouter from './productsRouter';
import carritoRouter from './carritoRouter';

const path = require('path');
let file:Files = new Files('cart.txt');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/productos', productsRouter);
app.use('/carrito', carritoRouter)

const server = http.listen(8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", (error:any) => console.log(`Error en el servidor: ${error}`))



