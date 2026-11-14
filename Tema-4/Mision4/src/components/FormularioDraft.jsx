import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaDraft } from "../schemas/draft";
import { useJugadores } from "../hooks/useJugadores";


export default function FormularioDraft() {
    const{
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
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
        console.log(jugadores)

    function onSubmit(datos){
        console.log("Draft válido:", datos);
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

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando...":"Guardar Draft"}</button>

        </form>
    )
}


