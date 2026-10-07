import { obtenerPersonajes } from "./api.js";
import { limpiarPersonajes, contarPorRaza } from "./datos.js";
import { pintarPersonajes, pintarOpcionesRaza } from "./render.js";

const listaPersonajes = document.querySelector("#listaPersonajes");
const mensajeCarga = document.querySelector("#carga");
const filtroRaza = document.querySelector("#filtroRaza");

// Prueba temporal: comprobar que llegan los personajes
async function cargarPersonajes() {
    mensajeCarga.textContent = "Cargando...";

    try{   
        const personajes = await obtenerPersonajes();
        const limpios = limpiarPersonajes(personajes);
        pintarPersonajes(limpios, listaPersonajes);
        
        //Primero contamos las razas de los personajes pasados a limpio y luego pintamos las distintas opciones
        const recuento = contarPorRaza(limpios);
        pintarOpcionesRaza(recuento, filtroRaza);
        mensajeCarga.textContent="";
    }catch (error){
        mensajeCarga.textContent = "No se ha podido cargar el contenido";
        console.error(error);
    }
}

cargarPersonajes();