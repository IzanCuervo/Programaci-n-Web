export default function Transformacion({transformacion}){
    return(
    <div className="Transformaciones">
        <img src={transformacion.imagen} alt={transformacion.nombre}></img>
        <p>{transformacion.nombre}</p>
        <p>Ki: {transformacion.ki}</p>
    </div>
    )
}
