
export async function guardarDrafts(draft) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/drafts`, { //Le pasamos la URL del env por si tenemos que cambiarla en un futuro no se rompa todo
    method: "POST",
    //Cómo debe de interpretar el servidosr el contenido, en este caso como un json
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(draft),
    });
    if(!respuesta.ok){
        throw new Error ("No se pudo guardar el draft (error" + respuesta.status + ")");
    }
    return respuesta.json();
}

export async function borrarDrafts(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/drafts/${id}`, {  //Le pasamos el id para que sepa qué draft tiene q eliminar
    method: "DELETE",  
    });

    if(!respuesta.ok){
        throw new Error ("No se pudo borrar el draft (error" + respuesta.status + ")");
    }
    return respuesta.json();
}


export async function obtenerDrafts() {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/drafts`) //Le pasamos la URL del env por si tenemos que cambiarla en un futuro no se rompa todo
    if(!respuesta.ok){
        throw new Error ("No se pudieron cargar los drafts guardados (error" + respuesta.status + ")");
    }
    return respuesta.json();
}