import { z } from "zod";

export const esquemaDraft = z
    .object({
        //Con trim no contamos los espacios en blanco como un caracter válido para el max o el min
        equipo: z.string().trim().min(3, "El nombre del equipo es demasiado corto").max(20, "El nombre del equipo es demasiado largo"),
        entrenador: z.string().trim().min(2, "El nombre del entrenador es demasiado corto"),
        portero: z.string({ error: "Elige un portero" }),
        defensa1: z.string({ error: "Elige un defensa" }),
        defensa2: z.string({ error: "Elige un defensa" }),
        medio1: z.string({ error: "Elige un medio" }),
        medio2: z.string({ error: "Elige un medio" }),
        delantero1: z.string({ error: "Elige un delantero" }),
        delantero2: z.string({ error: "Elige un delantero" }),
        capitan: z.string({ error: "Elige un capitán" }).min(1, "Elige un capitán"),
    })

    .refine((datos) => datos.defensa1 !== datos.defensa2, {
    error: "No puedes elegir al mismo defensa dos veces",
    path: ["defensa2"],
    })

    .refine((datos) => datos.medio1 !== datos.medio2, {
    error: "No puedes elegir al mismo medio centro dos veces",
    path: ["medio2"],
    })


    .refine((datos) => datos.delantero1 !== datos.delantero2, {
    error: "No puedes elegir al mismo delantero dos veces",
    path: ["delantero2"],
    })

    .refine((datos) =>
      [
        datos.portero,
        datos.defensa1,
        datos.defensa2,
        datos.medio1,
        datos.medio2,
        datos.delantero1,
        datos.delantero2,
      ].includes(datos.capitan),{
        error: "El capitán tiene que ser uno de tus 7 jugadores",
        path: ["capitan"],
      });