import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaDraft } from "../schemas/draft";
import { useJugadores } from "../hooks/useJugadores";
import HuecoJugador from "./HuecoJugador";
import { useCrearDraft } from "../hooks/useCrearDraft";
import { useState } from "react";


export default function FormularioDraft() {
    
    const{
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(esquemaDraft),
        defaultValues: {
            equipo: "", 
            entrenador: "",
            portero: null,
            defensa1: null,
            defensa2: null,
            medio1: null,
            medio2: null,
            delantero1: null,
            delantero2: null,
            capitan: "",
        }
    });

    const {
        data: 
        jugadores, 
        isPending, 
        isError,
        error, 
        refetch} = useJugadores()
    
    const creaDraft = useCrearDraft();
    const [ronda, setRonda] = useState(0);
    //watch devuelve los id de los elegidos en la plantilla final
    const elegidos = watch(["portero", "defensa1", "defensa2", "medio1", "medio2", "delantero1", "delantero2"]);
    
    if (isPending) return <p>Cargando...</p>
    if (isError) return( 
        <div>
            <p role="alert">Error no se han podido cargar los jugadores: {error.message}</p>
            <button onClick={() => refetch()}>Reintentar</button> {/*Damos la posibilidad de volver a cargar jugadores */}
        </div>    
        );

    // Filtrado de los personajes candidatos a capitán
    const candidatosCapitan = jugadores.filter((jugador) => elegidos.includes(jugador.id));

    function onSubmit(datos){
        //Si ha habido éxito al guardar el draft lo vaciaremos posteriormente
        creaDraft.mutate(datos, { onSuccess: () => {reset(); setRonda((r) => r+1);} });
    }

    return(
        //handleSubmit se encarga  de recoger los datos y zodResolver es quien los valida
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                {/*htmlFor nos indica que la etiqueta será para el campo con el id equipo que es nuestro input, así aparecerán juntos*/}
                <label htmlFor="equipo">Nombre del Equipo</label>
                <input id="equipo" type="text" autoComplete="off" 
                    aria-invalid={!!errors.equipo}        
                    aria-describedby={errors.equipo ? "error-equipo" : undefined}
                    {...register("equipo")} />
                {errors.equipo && (<p id="error-equipo" role="alert" className="error"> {errors.equipo.message}</p>)}
            </div>

            <div>
                <label htmlFor="entrenador">Entrenador</label>
                <input id="entrenador" type="text" autoComplete="off" 
                    aria-invalid={!!errors.entrenador}        
                    aria-describedby={errors.entrenador ? "error-entrenador" : undefined}
                    {...register("entrenador")} />
                {errors.entrenador && (<p id="error-entrenador" role="alert" className="error"> {errors.entrenador.message}</p>)}
            </div>

            {/*Con HuecoJugador ya construido vamos a ir pintando los Huecos donde se pintará cada personaje*/}
            <div key={ronda}>
                <HuecoJugador campo="portero" titulo="Portero" posicion="POR" jugadores={jugadores} register={register} error={errors.portero}/>
                
                <HuecoJugador campo="defensa1" titulo="Defensa 1" posicion="DEF" jugadores={jugadores} register={register} error={errors.defensa1} />

                <HuecoJugador campo="defensa2" titulo="Defensa 2" posicion="DEF" jugadores={jugadores} register={register} error={errors.defensa2} />

                <HuecoJugador campo="medio1" titulo="Centrocampista 1" posicion="MED" jugadores={jugadores} register={register} error={errors.medio1} />

                <HuecoJugador campo="medio2" titulo="Centrocampista 2" posicion="MED" jugadores={jugadores} register={register} error={errors.medio2} />

                <HuecoJugador campo="delantero1" titulo="Delantero 1" posicion="DEL" jugadores={jugadores} register={register} error={errors.delantero1} />

                <HuecoJugador campo="delantero2" titulo="Delantero 2" posicion="DEL" jugadores={jugadores} register={register} error={errors.delantero2} />
            </div>

            {/*Una vez filtrados los candidatoa a capitán vamos a pintar el seleccionador de capitán y al capitán*/}

            <div>
                <label htmlFor="capitan">Capitán</label>
                <select id="capitan" aria-invalid={!!errors.capitan} aria-describedby={errors.capitan ? "error-capitan" : undefined}
                    {...register("capitan")}>

                    <option value="">Elige capitán</option>
                    {candidatosCapitan.map((jugador) => <option key={jugador.id} value={jugador.id}>{jugador.nombre}</option>)}
                </select>
                {errors.capitan && (<p id="error-capitan" role="alert" className="error"> {errors.capitan.message}</p>)}
            </div>
            
            <button type="submit" disabled={creaDraft.isPending}>{creaDraft.isPending ? "Guardando...":"Guardar Draft"}</button>
            {creaDraft.isSuccess && <p role="status">¡Draft guardado!</p>}
            {creaDraft.isError && <p role="alert">{creaDraft.error.message}</p>}
        </form>
    )
}


