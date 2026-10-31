import { useState, useEffect } from 'react'
import { obtenerDetalles } from '../api.js'
import { limpiarDetalles } from '../datos.js'


import Planeta from "./Planeta";
import Transformaciones from './Transformaciones.jsx';

export default function Ficha({id, onCerrar}){
    const [cargando, setCargando] = useState(true)
    const [detalles, setDetalles] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignorar=false
        async function cargaDetalles() {
     
            try{
                const datos = await obtenerDetalles(id)
                const limpios = limpiarDetalles(datos)
                if(!ignorar){
                    setDetalles(limpios)
                }
            }catch (fallo){
                console.error(fallo)
                if(!ignorar){
                    setError("No se han podido cargar los detalles")
                }
            } finally {
                if(!ignorar){
                    setCargando(false)
                }
            }
        }

        cargaDetalles()

        return() => {
            ignorar = true
        }

    }, [id])
    

    return(
        <section className='Ficha'>
            {cargando && <p>Cargando Detalles...</p>}
            {error && <p>{error}</p>}
            {/*Es neceario el &&, por que los detalles solo se van a mostrar se encuentran en null (el usuario rompería la App) y cuando el usuario clique en un personaje*/}
            {detalles && (
                <>
                    <h2>{detalles.nombre}</h2>
                    <img src={detalles.imagen} alt={detalles.nombre}></img>
                    <Planeta planeta={detalles.planeta} />
                    <Transformaciones transformaciones={detalles.transformaciones}/>
                </>
            )}

            <button onClick={onCerrar}>Cerrar</button>
        </section>
    )
}
