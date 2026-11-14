import { useQuery } from "@tanstack/react-query"
import { obtenerJugadores } from "../services/jugadores"

export function useJugadores(){
    
    return useQuery({
                    queryKey: ["jugadores"],
                    queryFn: obtenerJugadores
                });

}

