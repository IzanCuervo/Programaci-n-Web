export default function Personaje ({ personaje }) {
    return (
        <div className="tarjetas">
            <h2>{personaje.nombre}</h2>
            <p>{personaje.raza}</p>
            <p>{personaje.ki}</p>
            <img src={personaje.imagen} alt={personaje.nombre}></img>
        </div>
    )
}

