
//Función asincrona para cargar los personajes de la api
export async function obtenerPersonajes(){
    //Lanza la petición y se queda esperando
    const respuesta = await fetch("https://dragonball-api.com/api/characters?limit=58");
    if(!respuesta.ok){
        throw new Error("No se han podido cargar los personajes");
    }
    
    const datos = await respuesta.json(); 
    return datos.items;
}

export async function obtenerDetalles(id) {
    
    const respuesta = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    if(!respuesta.ok){
        throw new Error("No se han podido cargar los detalles de los peersonajes");
    }

    //La respuesta ya nos devuelve los planetas y las transformaciones
    const datos = await respuesta.json();
    return datos;
}