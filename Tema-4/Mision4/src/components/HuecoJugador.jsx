export default function HuecoJugador({campo, titulo, posicion, jugadores, register, error}){
    
    const filtrados = jugadores.filter((jugador) => jugador.posicion === posicion);

    return (
        <fieldset> 
             {/*El legend es el título del grupo de radios: dice qué hueco es*/}
            <legend>{titulo}</legend>
                                        {/*Utilizamos el label ya que es una casilla clickable*/}
            {filtrados.map((jugador) => <label key={jugador.id}> 
                                            {/*Personaje que elige el jugador que se guarda en el campo que me sirve para registrar los personajes en su posición*/}
                                            <input type="radio" value={jugador.id} {...register(campo)}/>
                                            <img src={jugador.imagen} alt={jugador.nombre} width={"60"}/>
                                            {jugador.nombre} ({jugador.media})
                                        </label>)}
             {/*En caso de que haya algún problema con la carga de datos*/} 
            {error && <p role="alert" className="error">{error.message}</p>}
        </fieldset>
    );
}