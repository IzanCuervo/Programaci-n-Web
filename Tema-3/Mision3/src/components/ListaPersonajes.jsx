
import Personaje from "./Personaje.jsx"

export default function ListaPersonajes({personajes, onSeleccionar}){
    
    if (personajes.length === 0) {
        return <p>No hay personajes que coincidan</p>
    }
    return( 
        <section className="contenedorPersonajes">
        <p>Personajes cargados: {personajes.length}</p>

        {/*De esta manera pintamos los personajes en pantalla*/}
        {personajes.map((personaje) => (<Personaje key={personaje.id} personaje={personaje} onSeleccionar={onSeleccionar}/>))}
        </section>
    )

}