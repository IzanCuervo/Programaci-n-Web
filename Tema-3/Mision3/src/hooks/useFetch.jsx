import { useState, useEffect } from "react";

export function useFetch(url){
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [datos, setDatos] = useState(null)

    useEffect(() => {
    let ignorar = false

    async function pedir() {
      try {
        const respuesta = await fetch(url)
        if (!respuesta.ok) {
          throw new Error("La API ha respondido con un error")
        }
        const json = await respuesta.json()
        if(!ignorar){
            setDatos(json)
        }
      } catch (fallo) {
        console.log(fallo)
        if(!ignorar){
            setError("Ha ocurrido un error al cargar los datos")
        }

      } finally {
        if(!ignorar){
            setCargando(false)
        }
      }
    }

    pedir()

    return() => {
        ignorar=true
    }
  }, [url])

  return { datos, cargando, error }
}