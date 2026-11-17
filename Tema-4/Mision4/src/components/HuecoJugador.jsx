import { useState } from "react";

const NUM_CANDIDATOS=3;

export default function HuecoJugador({campo, titulo, posicion, jugadores, register, error}){
    
    const [candidatos, setCandidatos] = useState(null);
    const filtrados = jugadores.filter((jugador) => jugador.posicion === posicion);

    //Función que va a barajar a los jugadores para q el jugador los pueda seleccionar
    function abrirSobre(){
        const barajados = [...filtrados].sort(() => Math.random() - 0.5);
        setCandidatos(barajados.slice(0, NUM_CANDIDATOS)); //Nos quedamos con los tres candidatos
    }
    return (
        <fieldset> 
             {/*El legend es el título del grupo de radios: dice qué hueco es*/}
            <legend>{titulo}</legend>
            {/*Si candidatos es null, entonces ponemos un botón que ejecute la función abrir sobre, y sino ya mapeamos los barajados */}
            {candidatos === null ? <button type="button"  className="sobre" onClick={abrirSobre} aria-label={`Abrir sobre de ${titulo}`}>{posicion}</button> :
                                        /*Utilizamos el label ya que es una casilla clickable*/
                candidatos.map((jugador) => <label key={jugador.id}> 
                                            {/*Personaje que elige el jugador que se guarda en el campo que me sirve para registrar los personajes en su posición*/}
                                            <input type="radio" value={jugador.id} {...register(campo)}/>
                                            <img src={jugador.imagen} alt={jugador.nombre} width={"60"}/>
                                            <span className="nombre">{jugador.nombre}</span>
                                            <span className={`elemento ${jugador.elemento}`}>{jugador.elemento}</span>
                                            <span className="media">{jugador.media}</span>
                                        </label>)}
            {/*En caso de que haya algún problema con la validación Zod de datos*/} 
            {error && <p role="alert" className="error">{error.message}</p>}
        </fieldset>
    );
}