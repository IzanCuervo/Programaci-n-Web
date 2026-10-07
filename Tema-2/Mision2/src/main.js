import { obtenerPersonajes } from "./api.js";
import { limpiarPersonajes, contarPorRaza, filtraRaza } from "./datos.js";
import { pintarPersonajes, pintarOpcionesRaza } from "./render.js";

const contenedorPersonajes = document.querySelector("#contenedorPersonajes");
const mensajeCarga = document.querySelector("#carga");
const desplegableRaza = document.querySelector("#desplegableRaza");
let todosLosPersonajes = []; //variable global para guardar los personajes ya cargados

// Prueba temporal: comprobar que llegan los personajes
async function cargarPersonajes() {
    mensajeCarga.textContent = "Cargando...";

    try{   
        const personajes = await obtenerPersonajes();
        const limpios = limpiarPersonajes(personajes);
        todosLosPersonajes=limpios;
        pintarPersonajes(limpios, contenedorPersonajes);
        
        //Primero contamos las razas de los personajes pasados a limpio y luego pintamos las distintas opciones
        const recuento = contarPorRaza(limpios);
        pintarOpcionesRaza(recuento, desplegableRaza);
        mensajeCarga.textContent="";
    }catch (error){
        mensajeCarga.textContent = "No se ha podido cargar el contenido";
        console.error(error);
    }
}

cargarPersonajes();

//Añadimos un listener con el evento "change" para que cada que el usuario cambie de opcion el valor del desplegable se actualice
desplegableRaza.addEventListener("change", () => {
    const razaElegida = desplegableRaza.ariaValueMax;

    if(razaElegida === "Todas"){
        pintarPersonajes(todosLosPersonajes, contenedorPersonajes);   
    } else {
        const filtrados = filtraRaza(todosLosPersonajes, razaElegida);
        pintarPersonajes(filtrados, contenedorPersonajes);
    }
});