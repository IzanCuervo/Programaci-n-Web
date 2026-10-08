import "./style.css";
import { obtenerDetalles, obtenerPersonajes } from "./api.js";
import { limpiarPersonajes, contarPorRaza, filtraRaza, limpiarDetalles } from "./datos.js";
import { pintarPersonajes, pintarOpcionesRaza, pintarDetalles } from "./render.js";

//fichaDetalles contiene todos los elementos html pertenecientes a los detalles
const fichaDetalles = document.querySelector("#detalles");

const contenedorPersonajes = document.querySelector("#contenedorPersonajes");
const contenedorDetalles = document.querySelector("#contenedorDetalles");

const mensajeCarga = document.querySelector("#carga");
const mensajeCargaDetalles = document.querySelector("#cargaDetalles");

const desplegableRaza = document.querySelector("#desplegableRaza");
const botonCerrar = document.querySelector("#cerrarDetalles");

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

async function cargarDetalles(id){
    fichaDetalles.classList.remove("oculto");
    mensajeCargaDetalles.textContent = "Cargando...";

    try{   
        const detalles = await obtenerDetalles(id);
        const limpios = limpiarDetalles(detalles);
        pintarDetalles(limpios, contenedorDetalles);
        
        mensajeCargaDetalles.textContent="";
    }catch (error){
        mensajeCargaDetalles.textContent = "No se ha podido cargar el contenido";
        console.error(error);
    }
}

cargarPersonajes();

//Añadimos un listener con el evento "change" para que cada que el usuario cambie de opcion el valor del desplegable se actualice
desplegableRaza.addEventListener("change", () => {
    const razaElegida = desplegableRaza.value;

    if(razaElegida === "Todas"){
        pintarPersonajes(todosLosPersonajes, contenedorPersonajes);   
    } else {
        const filtrados = filtraRaza(todosLosPersonajes, razaElegida);
        pintarPersonajes(filtrados, contenedorPersonajes);
    }
});

//Nuestro parametro evento recogerá los clics q haga el usuario
contenedorPersonajes.addEventListener("click", (evento) => {
    
    //Target es el elemento de la página que es pulsado
    //closest() sube en la estructura de cajas html hasta que el elemento sea de una clase concreta, en este caso tarjeta
    const tarjeta = evento.target.closest(".tarjetas");

    if(tarjeta === null){
        return; //En caso de que ninguna tarjeta haya sido elegida nos salimos del listener
    }

    const id = tarjeta.dataset.id; //Recogemos el id asignado a esa tarjeta
    cargarDetalles(id);
});

botonCerrar.addEventListener("click", () => {
    fichaDetalles.classList.add("oculto");
});