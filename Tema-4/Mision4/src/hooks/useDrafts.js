import { useQuery } from "@tanstack/react-query"
import { obtenerDrafts } from "../services/draftsCreados";

export function useDrafts(){
    
    return useQuery({
                    //Ahora vamos a leer los drafts guardados para poder mostrarlos en la web
                    queryKey: ["drafts"],
                    queryFn: obtenerDrafts
                });

}

