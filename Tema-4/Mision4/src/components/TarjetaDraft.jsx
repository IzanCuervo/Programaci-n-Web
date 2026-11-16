export default function TarjetaDraft({draft, jugadores, abierto, onAlternar}){

    const jugadoresSeleccionados = [draft.portero, draft.defensa1, draft.defensa2, draft.medio1, draft.medio2, draft.delantero1, draft.delantero2];

    return (
        <li>
            {/*Aria-expanded me sirve para saber si está desplegado o no */}
            <button type="button" onClick={onAlternar} aria-expanded={abierto} >{draft.equipo} - {draft.entrenador} · Media {draft.media.toFixed(1)}</button>
            {/*En caso de que se encuentre abierto vamos a mostrar la lista de jugadores seleccionados */}
            {abierto && (
                <ul>
                    {jugadoresSeleccionados.map((id) => {const jugador = jugadores.find((jugador) => jugador.id === id);

                        if (!jugador) return null;
                        
                        return (
                            <li key={id}>
                                <img src={jugador.imagen} alt={jugador.nombre} width="40"/>
                                {jugador.nombre}
                                {jugador.posicion}
                                {/*En caso de que el id se corresponda con el del capitán lo mostramos*/}
                                {id === draft.capitan && "CAP"}
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>
    )
}