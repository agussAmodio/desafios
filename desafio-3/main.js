// a) ruta get '/productos' => array con todos los productos disponibles 
// b) ruta get '/productosRandom' => producto elegido al azar entre todos los productos disponibles

// 2) incluir un archivo txt 'productos.txt' utilizar la clase contenedor del desafio anterior para acceder a los datos persistidos del servidor 

const db = require("./db.js")
const express = require('express');
const app = express()

const DB = new db("data")

// get 

async function obtenerProductos (){
    const data = await DB.getAll()
    return data
}

app.get('/productos' , async (req , res) =>{
    return res.send(obtenerProductos())
})

  function obtenerIndiceRandom(max) {
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
  }

app.get('/productoRandom' , async (req , res) => {
    data = await obtenerProductos()
    const cantidadProductos = data.length - 1 
    const productoRandom = data[obtenerIndiceRandom(cantidadProductos)]
    console.log(productoRandom);
    console.log(obtenerIndiceRandom(cantidadProductos));
    return res.send(productoRandom)
})


// listen

const server = app.listen(8080 , () => {
    console.log("Servidor de express iniciado");
})