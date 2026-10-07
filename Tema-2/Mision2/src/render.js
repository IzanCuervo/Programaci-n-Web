// Crea la tarjeta de un personaje (antes era el componente TarjetaPersonaje de React)
export function crearTarjeta(personaje) {
    const tarjeta = document.createElement("div");

    const nombre = document.createElement("h2");
    nombre.textContent = personaje.nombre;

    const raza = document.createElement("p");
    raza.textContent = personaje.raza;

    const imagen = document.createElement("img");
    imagen.src = personaje.imagen;
    imagen.alt = personaje.nombre;

    tarjeta.append(nombre, raza, imagen);
    return tarjeta;
}

export function pintarOpcionesRaza(recuento, desplegable){
    //La Key de las razas serán los nombres de las razas del recuento q nos devolverá la función contarPorRazas
    const razas = Object.keys(recuento);
    //Como tengo una lista de razas y necesitamos una opcion por cada una vamos a mapearlo
    const opciones = razas.map((raza) =>{
        const opcion = document.createElement("option");
        //raza es la clave y recuento[raza] el valor
        opcion.textContent = `${raza} (${recuento[raza]})`;
        opcion.value = raza;
        return opcion;
    });
    //Los tres puntos me sirven para añadir los 13 elementos de la lista
    desplegable.append(...opciones);
}

// Con map crearemos una tarjeta por personaje y las metemos todas en el contenedor
export function pintarPersonajes(personajes, contenedor) {
    contenedor.textContent = "";
    const tarjetas = personajes.map((personaje) => crearTarjeta(personaje));
    contenedor.append(...tarjetas);
}
