const { log } = require("console");
const fs = require("fs")

class contenedor {

    constructor (archivo) {
        this.archivo = archivo;
    }

    async obtenerProductosDesdeDb() {
        const data = await fs.promises.readFile(`${this.archivo}/productos.json` , 'utf-8') // Lee el archivo productos.json y lo guarda como string en la variable data 
        let productos = JSON.parse(data) // transforma (parsea) la variable data de string a tipo array de objeto (de tipo producto) y lo almacena en la variable productos
        return productos // retorna el array de productos
    }

    async guardarProductosEnDb(productos){
        const productosString = JSON.stringify(productos)
        await fs.promises.writeFile(`${this.archivo}/productos.json` , productosString)
    }
    
async save (productoParaGuardar){

    let productos 

    try{
        
        productos = await this.obtenerProductosDesdeDb()
    

    }catch(error){
        productos = []

    }

    let id

    if (productos.length === 0){
        id = 1
        productoParaGuardar.id = id

    }else{
        let ultimoProducto = productos[productos.length - 1]
        let idActual = ultimoProducto.id
        id = idActual + 1
        productoParaGuardar.id = id
    }

    productos.push(productoParaGuardar)
    
    this.guardarProductosEnDb(productos)


}

async getById(idBuscar){


    const productos = await this.obtenerProductosDesdeDb()

    const productoEncontrado = productos.find(producto => producto.id === idBuscar)

    if (productoEncontrado === undefined) {
        
        return null

    }else {

        return productoEncontrado

    }

}


async getAll(){

    try {
        
        return await this.obtenerProductosDesdeDb()

    } catch (error) {
        return []
    }

}

async deleteById (idBorrar){

    const productos = await this.obtenerProductosDesdeDb()

   const indiceDeProductoABorrar = productos.findIndex (x => x.id === idBorrar)


    if (indiceDeProductoABorrar !== -1) {
        productos.splice(indiceDeProductoABorrar , 1)
        this.guardarProductosEnDb(productos)  
    } else{
        console.log("Id no encontrado");
    }


   
}

async delateAll(){


    const productos = await this.obtenerProductosDesdeDb()

    productos.splice(0 , productos.length)

    this.guardarProductosEnDb(productos)

}

}
  
async function imprimir() {
    const productoPrueba = new contenedor("data");
    productoPrueba.save({ tittle: "Samsung a20", price: "30000" , thumbnail: "www.samsung.com" });
   // console.log(await productoPrueba.getById(3));
    //console.log(await productoPrueba.getAll());
   //productoPrueba.deleteById(1)
    // productoPrueba.delateAll()
}

imprimir()