import { useState, useEffect, createContext } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const SuperContext = createContext();

const SuperProvider = ( {children} ) => {

    
    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido ] = useState([])
    const [ nombre, setNombre ] = useState("")
    const [ total, setTotal ] = useState(0)

    
    const router = useRouter()

    // LLAMADA A LA API DE CATEGORIAS
    const obtenerCategoria = async () => {
        const { data } = await axios("/api/categorias");
        setCategorias( data )
        
    }
//USE EFFECT QUE EJECUTA obtenerCategoria
    useEffect(() => {
        obtenerCategoria()
    }, [])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto) =>(
            producto.precio * producto.cantidad) + total, 0) 
            setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push("/")
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }
    
    const handleAgregarPedido = ( {categoriaId, ...producto} ) =>{
        if(pedido.some( productoState => productoState.id === producto.id)){
            //ACTUALIZAR CANTIDAD DE PRODUCTO

            const pedidoActualizado = pedido.map( productoState =>( 
                productoState.id === producto.id ? producto : productoState ))
                setPedido( pedidoActualizado ) 
                toast.success("Guardado correctamente")
        }else {
            setPedido([...pedido,producto])
            toast.success("Agregado al pedido")
        }

       setModal(false)
        
    }

    const handleEditarCantidares = ( id )=>{
        const productoActualizar = pedido.filter( producto =>
            producto.id === id
        )
        setProducto(productoActualizar[0])
        if(setModal(!modal)){
            toast.success("Pedido eliminado")
        }
       
    }

    const handleEliminarProducto = ( id ) =>{
        const pedidoActualizado= pedido.filter( producto =>
            producto.id !== id )
        setPedido(pedidoActualizado)
        toast.success("Pedido eliminado")
    }

    const colocarOrden = async (e) =>{
        e.preventDefault();
    //LLAMADA A NUESTRA BASE DE DATOS
        try {
            await axios.post("/api/ordenes", {nombre, total, pedido});
            
            //Resetear App
            
            setCategoriaActual(categorias[0])  
            setPedido([])
            setNombre("")
            setTotal(0)

            toast.success("Pedido realizado Correctamente")

            setTimeout(()=>{
                router.push("/")
            },3000)
           

        } catch (error) {
            console.log(error)
        }
       
    }
    

  return (
    
    <SuperContext.Provider 
        value={{
            categorias,
            setCategorias,
            categoriaActual,
            handleClickCategoria,
            handleSetProducto,
            producto,
            handleChangeModal,
            modal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidares,
            handleEliminarProducto,
            nombre, 
            setNombre,
            colocarOrden,
            total
        }}
    >
        {children}
    </SuperContext.Provider>
  )
}

export{
    SuperProvider
}

export default SuperContext
