import { useDrafts } from "../hooks/useDrafts"
import { useJugadores } from "../hooks/useJugadores";
const JUGADORES_POR_DRAFT = 7;

export default function ClasificacionDrafts(){
    //Recibimos los Drafts guardados
    const { 
        data:
        drafts, 
        isPending,
        isError,
        error
    } = useDrafts();

    //Por otro lado recibimos también los jugadores que vamos a mostrar cuando se cliquen los botones

    const {
        data:
        jugadores,
        isPending: cargandoJugadores, //Este isPending será cargandoJugadores ya que tenemos dos isPending
        isError: errorJugadores
        
    } = useJugadores();

    if(isPending || cargandoJugadores) return <p role="status">Cargando drafts...</p>
    if(isError) return <p role="alert">Error no se han podido cargar los drafts: {error.message}</p>
    if(errorJugadores) return <p role="alert">No se han podido cargar los jufadores</p>

    function calcularMedia(draft){
        const jugadoresSeleccionados = [draft.portero, draft.defensa1, draft.defensa2, draft.medio1, draft.medio2, draft.delantero1, draft.delantero2];
        
        //Primero mapearemos los jugadores a sus id y luego de ese jugador veremos si se corresponde con la id mapeada
        const medias = jugadoresSeleccionados.map((id) => { const jugador = jugadores.find((jugador) => jugador.id === id);
        //En caso de q no sea jugador no añadiremos su media
        if(!jugador) return 0;

        return jugador.media;
        
        });

        //El 0 es el valor inicial del total
        //Con reduce convertimos el array de medias en un solo valor
        const suma = medias.reduce((total, media) => total+media, 0);
        return suma/JUGADORES_POR_DRAFT;
    }
    
    //Asignamos las medias a cada draft correspondiente y los vamos a ordenar de mayor a menor
    const clasificacion = drafts.map((draft) => ({...draft, media: calcularMedia(draft)})).sort((a, b) => b.media - a.media);
    return(
        <section className="clasificadorDrafts">
            <h2>Clasificación Drafts</h2>
            <ol>
                {clasificacion.map((draft) => <li key={draft.id}><button type="button" >{draft.equipo} - {draft.entrenador}  Media {draft.media.toFixed(1)}</button></li>)}
            </ol>
        </section>
    )
}

