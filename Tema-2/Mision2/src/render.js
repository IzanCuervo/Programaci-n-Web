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

// Con map crearemos una tarjeta por personaje y las metemos todas en el contenedor
export function pintarPersonajes(personajes, contenedor) {
    const tarjetas = personajes.map((personaje) => crearTarjeta(personaje));
    contenedor.append(...tarjetas);
}
