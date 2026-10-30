import { useState, useEffect } from 'react'
import { obtenerDetalles } from '../api.js'
import { limpiarDetalles } from '../datos.js'


import Planeta from "./Planeta";

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


        </section>
    )
}
