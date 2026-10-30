import { useState, useEffect } from 'react'
import { obtenerPersonajes, obtenerDetalles } from './api.js'
import { limpiarPersonajes, filtraRaza, contarPorRaza } from './datos.js'

import ListaPersonajes from './components/ListaPersonajes.jsx'
import FiltroRazas from './components/FiltroRazas.jsx'


import './App.css'

function App() {
  //Los personajes comienzan en un array vacío, en el que se van almacenar los personajes devueltos por la API
  const [personajes, setPersonajes] = useState([])
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const [razaElegida, setRazaElegida] = useState("Todas")

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

  const recuento = contarPorRaza(personajes)
  const personajesFiltrados = razaElegida==="Todas" ? personajes : filtraRaza(personajes, razaElegida)
  return (
    <>
      {cargando && <p>Cargando personajes...</p>}
      {error && <p>{error}</p>} {/*Pintamos el contenido de error*/}

      <FiltroRazas recuento={recuento} razaElegida={razaElegida} onCambiar={setRazaElegida} />
      <ListaPersonajes personajes={personajesFiltrados} onSeleccionar={setIdSeleccionado}/>
     
    </>
  )
}

export default App

