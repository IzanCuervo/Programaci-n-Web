import { useState, useEffect } from 'react'
import { obtenerPersonajes, obtenerDetalles } from './api.js'
import { limpiarPersonajes } from './datos.js'
import './App.css'

function App() {
  //Los personajes comienzan en un array vacío, en el que se van almacenar los personajes devueltos por la API
  const [personajes, setPersonajes] = useState([])
  useEffect(() =>{
    async function cargaPersonajes(){
      const datos = await obtenerPersonajes()
      const limpios = limpiarPersonajes(datos)
      setPersonajes(limpios)
    }

    cargaPersonajes();
  }, []);
  return (
    <>
      <p>Personajes cargados: {personajes.length}</p>
    </>
  )
}

export default App

