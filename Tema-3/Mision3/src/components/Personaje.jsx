export default function Personaje ({ personaje, onSeleccionar }) {
    return (
        <div className="tarjetas" onClick={() => onSeleccionar(personaje.id)}>
            <h2>{personaje.nombre}</h2>
            <p>{personaje.raza}</p>
            <p>{personaje.ki}</p>
            <img src={personaje.imagen} alt={personaje.nombre}></img>
        </div>
    )
}

