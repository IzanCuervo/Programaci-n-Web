export async function obtenerJugadores() {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/jugadores`) //Le pasamos la URL del env por si tenemos que cambiarla en un futuro no se rompa todo
    if(!respuesta.ok){
        throw new Error ("No se pudieron cargar los jugadores (error" + respuesta.status + ")");
    }
    return respuesta.json();
}