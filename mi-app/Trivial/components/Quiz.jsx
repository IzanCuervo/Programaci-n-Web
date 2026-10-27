import { useState } from "react";
import {PREGUNTAS} from "./preguntas.js";

export default function Quiz (){
    const[indice, setIndice] = useState(0);

    const pregunta = PREGUNTAS[indice];


    return (
        <div>
            <h2>{pregunta.texto}</h2>
            <button onClick={() => setIndice(indice+1)}></button>

        </div>
    )
};