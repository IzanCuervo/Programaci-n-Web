import Transformacion from "./Transformacion.jsx"

export default function Transformaciones({ transformaciones }){

    if(transformaciones.length === 0){
        return <p>Sin Transformaciones</p>
    }

    return(
        <section className="Transformaciones">
           {transformaciones.map((transformacion) => (<Transformacion key={transformacion.id} transformacion={transformacion}/>))}
        </section>
    )
}