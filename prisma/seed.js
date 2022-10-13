const { categorias } = require ("./data/categorias")
const { productos } = require("./data/productos") 
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async ()  => {
    try{
        await prisma.categoria.createMany({
            data : categorias
        })
        await prisma.producto.createMany({
            data : productos
        })
    }
    catch (error){
        console.log(error)
    }
}
main()