import { z } from "zod"

export const esquemaJugador = z.object({
    id: z.string(),
    nombre: z.string().min(1),
    posicion: z.enum(["POR", "DEF", "MED", "DEL"]),
    elemento: z.enum(["Fuego", "Bosque", "Aire", "Montaña"]),
    imagen: z.url(),
    equipo: z.string(),
    media: z.number().int().min(1).max(99)

})