
export function limpiarPersonajes(personajes){
    return personajes.map((personaje) => {
        return{
            id: personaje.id,
            imagen: personaje.image,
            nombre: personaje.name,
            raza: personaje.race,
            ki: personaje.ki,
            maxKi: personaje.maxKi,
            descripcion: personaje.description,
            genero: personaje.gender,
        };
    });
}

export function limpiarDetalles(personaje){
   //Solo queremos saber los detalles de un personaje especifico por lo que Map no será necesario aquí
   return{

        nombre: personaje.name,
        imagen: personaje.image,
        // El planeta es un solo objeto con varios atributos y las transformaciones son una lista de objetos
            planeta:{
                nombre: personaje.originPlanet.name,
                imagen: personaje.originPlanet.image,
                descripcion: personaje.originPlanet.description,
                destruido: personaje.originPlanet.isDestroyed,
            },

            //Transformaciones es una lista por lo tanto auí si necesitamos recorrer las del personaje

            transformaciones: personaje.transformations.map((transformacion) =>{
                return{
                    nombre: transformacion.name,
                    imagen: transformacion.image,
                    ki: transformacion.ki,
                };
            }),
        };
}

//Desplegable de Razas

export function filtraRaza(personajes, raza){
    const personajesRaza = personajes.filter(personaje => personaje.raza === raza)
    return personajesRaza;
}

// Cuenta cuántos personajes hay de cada raza: { Saiyan: 10, Android: 9, ... }
export function contarPorRaza(personajes){
    // recuento es la "pizarra": empieza vacía ({}) y en cada vuelta se apunta la raza de un personaje
    const razas = personajes.reduce((recuento, personaje) => {
        const raza = personaje.raza;
        //Con reduce automatizamos el recorrido, simplemente si la raza aun no esta definida, se crea y se iguala a 1, sino simplemente se suma un personaje más
        if (recuento[raza] === undefined) {
            recuento[raza] = 1;                  // primera vez que sale esta raza: la apuntamos con 1
        } else {
            recuento[raza] = recuento[raza] + 1; // ya estaba apuntada: le sumamos 1
        }

        return recuento;                         // pasamos la pizarra a la siguiente vuelta
    }, {});

    return razas;
}