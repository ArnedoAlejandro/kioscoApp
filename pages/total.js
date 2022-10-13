import Layout from "../layout/Layout"
import { useEffect, useCallback } from 'react'
import useSuper from "../hooks/useSuper"
import { formatearDinero } from "../helpers"

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useSuper()

//Validacion para manipular el boton de Confirmar pedido 

    const comprobarPedido = useCallback(()=>{
        return pedido.length === 0 || nombre === "" || nombre.length < 3;
    }, [ pedido, nombre ])

    useEffect(( ) =>{
        comprobarPedido();
    },[pedido, comprobarPedido]) 

   


    return(
        <Layout pagina="Total y Confirmar Pedido">
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10 font-bold">Confimar tu Pedido a continuacion</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label 
                        className="block uppercase text-slate-800 text-xl font-bold"
                        htmlFor="nombre">Nombre</label>
                    <input
                        className="bg-gray-300 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                    />
                </div>
                <div className="mt-10 ">
                    <p className="text-2xl">
                        Total a pagar: {""} <span className="font-bold">{formatearDinero(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    <input 
                        type="submit"
                        className={` ${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer" } w-full lg:w-auto text-center px-5 py-2 rounded uppercase font-bold text-white `}
                        value="Confirmar pedido"
                        disabled={comprobarPedido()}
                    /> 
                </div>



            </form>
        </Layout>
    )


}