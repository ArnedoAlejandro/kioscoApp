import Image from "next/image"
import useSuper from "../hooks/useSuper"

const Categoria = ( {categoria} ) => {

    const { categoriaActual, handleClickCategoria } = useSuper()
    const { nombre, icono, id } = categoria

  return (
    <div className={ 
            `${categoriaActual?.id === id ? "bg-blue-500" : ""}
            flex items-center gap-4 w-full border-2 p-5 hover:bg-blue-600 `
        }>
        <Image 
            height="70"
            width= "70"
            src={`/assets/img/icono_${icono}.svg`}
            alt="imagen icono"
            className="mr-5"
        />
        <button
            type="button"
            className="text 2xl font-bold hover: cursor-pointer"
            onClick={ ()=> handleClickCategoria(id) }  
        >
            {nombre}
        </button>

    </div>
  )
}

export default Categoria