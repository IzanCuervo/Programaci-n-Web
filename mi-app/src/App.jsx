import Boton from "./components/button.jsx";
import Saludo from "./components/saludo.jsx";
import FichaTripulante from "./components/FichaTripulante.jsx";
import Esclusa from "./components/Esclusa.jsx";

export default function App() {
  return( 
    <>
    <Boton />
    <Saludo nombre = "Ada" apellido ="Flores"/>
    <FichaTripulante nombre = "Ellen" rol="Tripulante"/>
    <FichaTripulante nombre = "Alice" rol="Tripulante"/>
    <FichaTripulante nombre = "Robert" rol="Tripulante" especie="Marciana"/>
    <Esclusa abierta = {true} avisos = {0}/>
    </>
  )
}

