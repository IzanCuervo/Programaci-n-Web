import { urlDetalle } from '../api.js'
import { useFetch } from '../hooks/useFetch.jsx'
import { limpiarDetalles } from '../datos.js'


import Planeta from "./Planeta";
import Transformaciones from './Transformaciones.jsx';

export default function Ficha({id, onCerrar}){
    //El hook pide el personaje del id; si el id cambia, vuelve a pedir
    const { datos, cargando, error } = useFetch(urlDetalle(id))
    //Mientras carga datos es null, así que detalles también
    const detalles = datos ? limpiarDetalles(datos) : null
 
    return(
        <section className='Ficha'>
            {cargando && <p>Cargando Detalles...</p>}
            {error && <p>{error}</p>}
            {/*Es necesario el &&, porque mientras carga los detalles se encuentran en null y al leer detalles.nombre la App se rompería*/}
            {detalles && (
                <>
                    <h2>{detalles.nombre}</h2>
                    <img src={detalles.imagen} alt={detalles.nombre}></img>
                    <Planeta planeta={detalles.planeta} />
                    <Transformaciones transformaciones={detalles.transformaciones}/>
                </>
            )}

            <button onClick={onCerrar}>Cerrar</button>
        </section>
    )
}
