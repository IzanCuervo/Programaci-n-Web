import { useState, useEffect } from 'react'
import { obtenerPersonajes, obtenerDetalles } from './api.js'
import { limpiarPersonajes } from './datos.js'
import ListaPersonajes from './components/ListaPersonajes.jsx'
import './App.css'

function App() {
  //Los personajes comienzan en un array vacío, en el que se van almacenar los personajes devueltos por la API
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>{
    let ignorar = false

    async function cargaPersonajes(){
      try{
        const datos = await obtenerPersonajes()
        const limpios = limpiarPersonajes(datos)
        if(!ignorar){
          setPersonajes(limpios)
        }
      }catch(fallo){
        console.error(fallo)
        if(!ignorar){
          setError("No se ha podido cargar el contenido")
        }
      } finally {
        if(!ignorar){
          setCargando(false)
        }
      }
    }

    cargaPersonajes();

    return () => {
      ignorar = true
    }
  }, []);
  return (
    <>
      {cargando && <p>Cargando personajes...</p>}
      {error && <p>{error}</p>} {/*Pintamos el contenido de error*/}

      <ListaPersonajes personajes={personajes}/>
     
    </>
  )
}

export default App

