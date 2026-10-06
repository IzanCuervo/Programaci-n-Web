
export function limpiarPersonajes(personajes){
    return personajes.map((personaje) => {
        return{
            id: personajes.id,
            imagen: personajes.image,
            nombre: personajes.name,
            raza: personajes.race,
            ki: personajes.ki,
            maxKi: personajes.maxKi,
            descripcion: personajes.description,
            genero: personajes.gender,
        };
    });
}

export function filtraRaza(personajes, raza){
    const razaSelec = personajes.filter(race => personajes.raza === raza)

}