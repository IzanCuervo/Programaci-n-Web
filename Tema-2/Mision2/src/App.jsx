import { obtenerPersonajes } from "./api.js";

// Prueba temporal: comprobar que llegan los personajes
const personajes = await obtenerPersonajes();
console.log(personajes);

export default function App() {
  return( 
    <>
    <h1>Dragon Ball</h1>
    </>
  )
}