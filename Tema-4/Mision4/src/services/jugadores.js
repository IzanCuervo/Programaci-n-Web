import { esquemaJugador } from "../schemas/jugador";

export async function obtenerJugadores() {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/jugadores`) //Le pasamos la URL del env por si tenemos que cambiarla en un futuro no se rompa todo
    if(!respuesta.ok){
        throw new Error ("No se pudieron cargar los jugadores (error" + respuesta.status + ")");
    }
    
    const datos = await respuesta.json();

    //Validamos cada jugador con Zod
    const jugadoresValidos = datos.filter((jugador) => {const resultado = esquemaJugador.safeParse(jugador)
        if(!resultado.success){
            console.warn("Jugador descartado:", jugador, resultado.error.issues);
        }

        return resultado.success;
    });
    return jugadoresValidos;
}