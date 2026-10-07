import { useState } from "react";

export function Aplausometro(){

    let [aplausos, setAplausos] = useState(0);
    
    let mensaje;
    
    if(aplausos<5){ mensaje="Timido..."}
    else if(aplausos<15){ mensaje="Se anima la sala!!"}
    else{mensaje="OVACIÓN TOTAL!!"}

    return(
    <>
    <section>
        <button onClick={() => setAplausos(aplausos+1)}></button>
        <p>Contador: {aplausos}</p>
        <p>Mesaje: {mensaje}</p>

        <div>
             <button onClick={() => setAplausos(aplausos+1)}></button>
              <button onClick={() => setAplausos(0)}> Reiniciar </button>
        </div>
    </section>
    </>
    );
}