import { obtenerPersonajes } from "./api.js";
import { limpiarPersonajes } from "./datos.js";
import { pintarPersonajes } from "./render.js";

const listaPersonajes = document.querySelector("#listaPersonajes");
const mensajeCarga = document.querySelector("#carga");

// Prueba temporal: comprobar que llegan los personajes
async function cargarPersonajes() {
    mensajeCarga.textContent = "Cargando...";

    try{
        mensajeCarga.textContent="";
        const personajes = await obtenerPersonajes();
        const limpios = limpiarPersonajes(personajes);
        pintarPersonajes(limpios, listaPersonajes);
    }catch (error){
        mensajeCarga.textContent = "No se ha podido cargar el contenido";
        console.error(error);
    }
}

cargarPersonajes();