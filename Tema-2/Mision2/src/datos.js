
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

export function filtraRaza(personajes, raza){
    const razaSelec = personajes.filter(personaje => personaje.raza === raza)
    return razaSelec
}
