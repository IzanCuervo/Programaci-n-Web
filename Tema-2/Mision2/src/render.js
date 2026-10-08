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

    //Vamos a darle una clase y un id a nuestra tarjeta
    tarjeta.classList.add("tarjetas");
    tarjeta.dataset.id = personaje.id; //La id de cada tarjeta es la correspondiente a su personaje

    tarjeta.append(nombre, raza, imagen);
    return tarjeta;
}

// Crea el bloque del planeta de origen: nombre, imagen y si está destruido
function crearPlaneta(planeta){
    const bloquePlaneta = document.createElement("div");

    const planetaNombre = document.createElement("p");
    planetaNombre.textContent = `Planeta de Origen: ${planeta.nombre}`;

    const planetaImagen = document.createElement("img");
    planetaImagen.src = planeta.imagen;
    planetaImagen.alt = planeta.nombre;

    const planetaDestruido = document.createElement("p");
    planetaDestruido.textContent = planeta.destruido ? "Planeta destruido" : "Planeta intacto";

    bloquePlaneta.append(planetaNombre, planetaImagen, planetaDestruido);
    return bloquePlaneta;
}

// Crea el bloque de UNA transformación: imagen, nombre y ki
function crearTransformacion(transformacion){
    const bloqueTransformacion = document.createElement("div");

    const transformacionImagen = document.createElement("img");
    transformacionImagen.src = transformacion.imagen;
    transformacionImagen.alt = transformacion.nombre;

    const transformacionNombre = document.createElement("p");
    transformacionNombre.textContent = transformacion.nombre;

    const transformacionKi = document.createElement("p");
    transformacionKi.textContent = `Ki: ${transformacion.ki}`;

    bloqueTransformacion.append(transformacionImagen, transformacionNombre, transformacionKi);
    return bloqueTransformacion;
}

// Crea el bloque con TODAS las transformaciones (es una lista: un bloque por cada una con map)
function crearTransformaciones(transformaciones){
    const bloqueTransformaciones = document.createElement("div");

    if(transformaciones.length === 0){
        bloqueTransformaciones.textContent = "Sin transformaciones";
        return bloqueTransformaciones;
    }

    const bloques = transformaciones.map((transformacion) => crearTransformacion(transformacion));
    bloqueTransformaciones.append(...bloques);
    return bloqueTransformaciones;
}

// Crea la ficha completa de un personaje juntando su nombre, su planeta y sus transformaciones
export function crearDetalles(personaje){
    const tarjetaDetalles = document.createElement("div");

    const nombre = document.createElement("h2");
    nombre.textContent = personaje.nombre;

    tarjetaDetalles.append(nombre, crearPlaneta(personaje.planeta), crearTransformaciones(personaje.transformaciones));
    return tarjetaDetalles;
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
    if(personajes.length === 0){
        contenedor.textContent = "No hay personajes para mostrar";
        return;
    }
    contenedor.textContent = "";
    const tarjetas = personajes.map((personaje) => crearTarjeta(personaje));
    contenedor.append(...tarjetas);
}

export function pintarDetalles(personaje, contenedorDetalles){
    
    contenedorDetalles.textContent="";
    const tarjetaDetalle = crearDetalles(personaje);
    contenedorDetalles.append(tarjetaDetalle);
}
