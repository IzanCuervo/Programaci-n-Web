import { useState } from 'react'
import { useFetch } from './hooks/useFetch.jsx'
import { URL_PERSONAJES } from './api.js'
import { limpiarPersonajes, filtraRaza, contarPorRaza } from './datos.js'

import ListaPersonajes from './components/ListaPersonajes.jsx'
import FiltroRazas from './components/FiltroRazas.jsx'
import Ficha from './components/Ficha.jsx'

import './App.css'

function App() {
  //Los personajes comienzan en un array vacío, en el que se van almacenar los personajes devueltos por la API
  //const [personajes, setPersonajes] = useState([])
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const [razaElegida, setRazaElegida] = useState("Todas")

  //const [cargando, setCargando] = useState(true)
  //const [error, setError] = useState(null)

  //El hook se encarga de pedir los datos y nos devuelve datos, cargando y error
  const { datos, cargando, error } = useFetch(URL_PERSONAJES)
  //Mientras carga datos es null, así que personajes es un array vacío. La lista viene dentro de items
  const personajes = datos ? limpiarPersonajes(datos.items) : []

 /* useEffect(() =>{
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
  }, []);*/

  const recuento = contarPorRaza(personajes)
  const personajesFiltrados = razaElegida==="Todas" ? personajes : filtraRaza(personajes, razaElegida)
  return (
    <>
      {cargando && <p>Cargando personajes...</p>}
      {error && <p>{error}</p>} {/*Pintamos el contenido de error*/}

      <FiltroRazas recuento={recuento} razaElegida={razaElegida} onCambiar={setRazaElegida} />
      <ListaPersonajes personajes={personajesFiltrados} onSeleccionar={setIdSeleccionado}/>
      {/*Siempr que se haya seleccionado un personaje mostraremos los detalles */}
      {idSeleccionado !== null && (
        <Ficha id={idSeleccionado} onCerrar={() => setIdSeleccionado(null)} /> //siempre que onCerrar se clique el id seleccionado pasará a ser null
      )}
    </>
  )
}

export default App

