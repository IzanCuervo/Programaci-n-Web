import { useState, useEffect } from 'react'
import { obtenerPersonajes, obtenerDetalles } from './api.js'
import { limpiarPersonajes } from './datos.js'
import Personaje from './components/Personaje.jsx'
import './App.css'

function App() {
  //Los personajes comienzan en un array vacío, en el que se van almacenar los personajes devueltos por la API
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>{
    async function cargaPersonajes(){
      try{
        const datos = await obtenerPersonajes()
        const limpios = limpiarPersonajes(datos)
        setPersonajes(limpios)
      }catch(fallo){
        console.error(fallo)
        setError("No se ha podido cargar el contenido")
      } finally {
        setCargando(false)
      }
    }

    cargaPersonajes();
  }, []);
  return (
    <>
      {cargando && <p>Cargando personajes...</p>}
      {error && <p>{error}</p>} {/*Pintamos el contenido de error*/}
      <p>Personajes cargados: {personajes.length}</p>

      {/*De esta manera pintamos los personajes en pantalla*/}
      {personajes.map((personaje) => (<Personaje key={personaje.id} personaje={personaje}/>))}
    </>
  )
}

export default App

