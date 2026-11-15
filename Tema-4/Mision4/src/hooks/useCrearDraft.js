import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guardarDrafts } from "../services/draftsCreados";

export function useCrearDraft(){
    const queryClient = useQueryClient(); //Accedemos al almacen de Tanstack
    return useMutation({
        mutationFn: guardarDrafts,
        //Si la modificación ha ido bien, avisamos al almacen que la lista de drafts ha cambiado
        //De esta manera no es necesario recargar la página, ya que le decimos a Tanstack que haga otra petición a la api
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["drafts"]}),
    });
}