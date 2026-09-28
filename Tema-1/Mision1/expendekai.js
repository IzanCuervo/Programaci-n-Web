//Variables

// REVISIÓN: quedan números sueltos: el 80 del pity (descomenta la constante de abajo y úsala en
// generaYokai) y el 160 de darRecompensa (usa COSTE_TIRADA).
const COSTE_TIRADA = 160;
const TIRADAS_PITY_S = 80;

let cantidadMonedas=COSTE_TIRADA;
let cantidadTiradas=0;
let pity=0;
const yokaiObtenidos = [];

const monedas = document.querySelector("#monedas");
const tiradas = document.querySelector("#tiradas");

const invocaSingle = document.querySelector("#invocacion1");
const invocaMulti = document.querySelector("#invocacion8");
const botonMedalium = document.querySelector("#medalium");

const medalium = document.querySelector("#contenidoMedalium");

const resultado = document.querySelector("#resultado");
const error = document.querySelector("#error");
// REVISIÓN: botonMedalium y medalium se declaran pero todavía no se usan (ver muestraMedalium al final).

// REVISIÓN (pista): si quieres usar los vídeos de videos/, cada yokai tiene que "saber" cuál es el suyo.
// ¿Qué podrías añadir a cada objeto del array? Luego busca cómo crear un <video> desde JS y darle su src.
const yokais = [
    // Rango E
    { nombre: "Komemo", rango: "E" },
    { nombre: "Tentelento", rango: "E" },
    { nombre: "Alcaldero", rango: "E" },
    { nombre: "Illoo", rango: "E" },
    { nombre: "Yopaso", rango: "E" },

    // Rango D
    { nombre: /*sustituir*/"Komasan", rango: "D" },
    { nombre: "Cupistolo", rango: "D" },
    { nombre: "Cotilleja", rango: "D" },
    { nombre: "Jibanyan", rango: "D" },
    { nombre: "Komajiro", rango: "D" },

    // Rango C
    { nombre: "Iluho", rango: "C" },
    { nombre: "Telespejo", rango: "C" },
    { nombre: "Cadin", rango: "C" }, /*falta*/
    { nombre: "Walkappa", rango: "C" },/*falta*/
    { nombre: "Hidabat", rango: "C" },/*falta*/

    // Rango B
    { nombre: "Darumacho", rango: "B" },
    { nombre: "Baku", rango: "B" }, /*falta*/
    { nombre: "Frostina", rango: "B" }, /*falta*/
    { nombre: "Shmoopie", rango: "B" }, /*falta*/
    { nombre: "Castelius III", rango: "B" }, /*falta*/

    // Rango A
    { nombre: "Pandanoko", rango: "A" },
    { nombre: "", rango: "A" },
    { nombre: "", rango: "A" },
    { nombre: "Blazion", rango: "A" },
    { nombre: "", rango: "A" },

    // Rango S
    { nombre: "Kyubi", rango: "S" },
    { nombre: "Venocto Oscuro", rango: "S" },
    { nombre: "Tengu", rango: "S" },
    { nombre: "Snartle", rango: "S" },
    { nombre: "Goldenyan", rango: "S" }
];


invocaSingle.addEventListener("click", () =>{
    
    realizaInvocacion(1);

});


invocaMulti.addEventListener("click", () =>{
    
    realizaInvocacion(8);
   
});

const realizaInvocacion = (numInvocaciones) => {
    
    const costeTotal = numInvocaciones*COSTE_TIRADA;
    let resultadoTexto="";

    if(cantidadMonedas>=costeTotal){
        cantidadMonedas-=costeTotal;
            for(let i=0; i<numInvocaciones; i++){
                cantidadTiradas++;
            
                //Esta línea ya nos devuelve un booleano porque solo va comparando que la tirada sea la 8 
                const garantiaA = i === 7;
                const yokaiObtenido = generaYokai(garantiaA);

                darRecompensa(yokaiObtenido);
                resultadoTexto += `${i + 1}. Has obtenido a ${yokaiObtenido.nombre}!! - Rango ${yokaiObtenido.rango}\n`;
            
            }
        
            monedas.textContent = cantidadMonedas;
            tiradas.textContent = cantidadTiradas;
            // REVISIÓN (bug): los "\n" no hacen salto de línea dentro de un <p>, así que las tiradas salen seguidas.
            // Cambia #resultado por un <ol>/<ul>, vacíalo al empezar y crea un <li> por tirada en el bucle.
            resultado.textContent = resultadoTexto;
    } else {
        error.textContent = "No dispones de suficientes monedas";
    
    }
};


const generaYokai = (garantiaA) =>{

    // Probabilidades = E 35 % · D 25 % · C 20 % · B 12 % · A 7 % · S 1 %
    const probabilidad = Math.random() * 100;
    let rango;

   
    // Para la garantía A, piensa también: si esa tirada ya iba a ser S, ¿quieres bajarla a A?
    if(pity === 80){
        rango = "S";
    } else if (garantiaA){
        rango = "A";
    } else {
        rango=probabilidad < 35  ? "E"
             :probabilidad < 60 ? "D"
             :probabilidad < 80 ? "C"
             :probabilidad < 92 ? "B"
             :probabilidad < 99 ? "A"
             :                    "S";
    }

    //En caso de que hayamos llegado al pity, lo reseteamos a 0, sino lo incrementamos
    pity = rango === "S" ? 0 : pity + 1;

    //Vamos a filtrar los yokai que se correspondan con el rango que haya salido
    //yokai es una variable auxiliar creada por filter en la que se va guardando un yokai por vuelta
    const yokaiRango = yokais.filter(yokai => yokai.rango === rango);

    //Ahora de la lista de los yokai generados de ese rango escogeremos uno aleatorio
    //Básicamente multiplicamos un numero random (0-1) por la longitud y redondeamos hacia a bajo y obtendremos el yokai que queremos
    const posicion = Math.floor(Math.random() * yokaiRango.length);

    return yokaiRango[posicion];
};


const darRecompensa = (yokai) =>{

    //Comprobamos si el yokai que nos acaba de tocar está ya en nuestra coleccion de yokai 
    const duplicado = yokaiObtenidos.some(y => y.nombre === yokai.nombre);

    if (duplicado) {
       cantidadMonedas += COSTE_TIRADA;
    } else {
        yokaiObtenidos.push(yokai);
    }
    // REVISIÓN (pista): cuando hagas el Medalium, este else es el sitio donde sabes que un yokai es nuevo.
    // Y si quieres avisar de "repetido" en el mensaje, ¿cómo podría enterarse el listener? (piensa en return).
};

// REVISIÓN (pista): sin implementar. Cada yokai nuevo debería aparecer en #contenidoMedalium. Repasa
// document.createElement, textContent, classList.add y append (o appendChild). Ponerle una clase según
// el rango te servirá luego para darle estilo en tu CSS.
const actualizaMedalium = (yokai) =>{

}

// REVISIÓN (pista): sin implementar, y el botón Medalium todavía no tiene listener. Para mostrar/ocultar
// sin borrar nada, mira qué hace classList.toggle y combínalo con una clase que definas tú en el CSS.
const muestraMedalium = () =>{

}

// REVISIÓN (pista, BONUS + eventos de teclado): modo oscuro con una tecla secreta. Investiga el evento
// "keydown" (¿sobre qué elemento lo escucharías para que funcione en toda la página?) y la propiedad
// key del evento. Para los colores, igual que con el Medalium: una clase que alternas y defines en tu CSS.