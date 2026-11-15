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