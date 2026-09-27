//Variables

// REVISIÓN: saca los "números mágicos" (160, 1280, 8, 80) a constantes y úsalas en todo el archivo:
//   const COSTE_TIRADA = 160;
//   const TIRADAS_MULTI = 8;
//   const COSTE_MULTI = COSTE_TIRADA * TIRADAS_MULTI;   // 1280
//   const TIRADAS_PITY_S = 80;

// REVISIÓN (bug grave): con 0 monedas y sin ninguna forma de ganarlas, no se puede invocar nunca.
// Pon un saldo inicial (p. ej. 1600) o añade un botón/evento que dé monedas (ver comentario en el HTML).
let cantidadMonedas=0;
// REVISIÓN (pista): para la garantía de S te hace falta contar algo distinto a las tiradas totales.
// Piensa: ¿qué tienes que contar?, ¿cuándo sube? y ¿en qué momento vuelve a 0?
let cantidadTiradas=0;
// REVISIÓN: const en vez de let; el array nunca se reasigna, solo se le hace push.
const yokaiObtenidos = [];

const monedas = document.querySelector("#monedas");
const tiradas = document.querySelector("#tiradas");

const invocaSingle = document.querySelector("#invocacion1");
const invocaMulti = document.querySelector("#invocacion8");
const botonMedalium = document.querySelector("#medalium");

const medalium = document.querySelector("#contenidoMedalium");

// REVISIÓN (bug): faltan los nodos de resultado. Ahora "resultado1" y "resultado8" solo funcionan porque el
// navegador crea una variable global por cada id, y eso es muy frágil. Selecciónalos como el resto:
   const resultado1 = document.querySelector("#resultado1");
   const resultado8 = document.querySelector("#resultado8");
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
    { nombre: "Komasan", rango: "D" },
    { nombre: "Cupistolo", rango: "D" },
    { nombre: "Cotilleja", rango: "D" },
    { nombre: "Jibanyan", rango: "D" },
    { nombre: "Komajiro", rango: "D" },

    // Rango C
    { nombre: "Iluho", rango: "C" },
    { nombre: "Telespejo", rango: "C" },
    { nombre: "Cadin", rango: "C" },
    { nombre: "Walkappa", rango: "C" },
    { nombre: "Hidabat", rango: "C" },

    // Rango B
    { nombre: "Darumacho", rango: "B" },
    { nombre: "Baku", rango: "B" },
    { nombre: "Frostina", rango: "B" },
    { nombre: "Shmoopie", rango: "B" },
    { nombre: "Castelius III", rango: "B" },

    // Rango A
    { nombre: "Noko", rango: "A" },
    { nombre: "Kyubi", rango: "A" },
    { nombre: "Venoct", rango: "A" },
    { nombre: "Blazion", rango: "A" },
    { nombre: "Shogunyan", rango: "A" },

    // Rango S
    // REVISIÓN (bug): "Kyubi" ya está en el rango A. Los repetidos se comprueban por nombre, así que este
    // contaría como repetido si ya tienes el de rango A. Cambia uno de los dos por otro yokai.
    { nombre: "Kyubi", rango: "S" },
    { nombre: "Venocto Oscuro", rango: "S" },
    { nombre: "Tengu", rango: "S" },
    { nombre: "Snartle", rango: "S" },
    { nombre: "Goldenyan", rango: "S" }
];


// REVISIÓN: este listener y el de x8 repiten casi lo mismo (cobrar, sumar tiradas, generar, dar recompensa,
// pintar). Sácalo a una función, p. ej. realizarTiradas(cantidad), y que los dos listeners la llamen.
invocaSingle.addEventListener("click", () =>{
    
    // REVISIÓN: COSTE_TIRADA en vez de 160 (aquí y en la línea de abajo).
    if(cantidadMonedas>=160){
        cantidadMonedas-=160;
        cantidadTiradas++;

        // REVISIÓN (bug): esto se pinta ANTES de darRecompensa(). Si sale repetido, las 160 monedas devueltas no
        // se ven hasta la siguiente tirada. Muévelo debajo de darRecompensa() (mejor aún: una función
        // actualizaMarcador() que pinte monedas y tiradas y que uses en los dos listeners).
        monedas.textContent = cantidadMonedas;
        tiradas.textContent = cantidadTiradas;       

        const yokaiObtenido = generaYokai(false);
        darRecompensa(yokaiObtenido);
        // REVISIÓN: resultado1 no está declarado (ver arriba). En español: `¡Has obtenido a ${...}! Rango ${...}`.
        // Si darRecompensa() devuelve si era repetido, aquí puedes añadir "(repetido, +160 monedas)".
        resultado1.textContent = `Has obtenido a ${yokaiObtenido.nombre}!! Rango ${yokaiObtenido.rango}`;
        
    } else {
        // REVISIÓN: buen sitio para usar classList: resultado1.classList.add("error") aquí y
        // classList.remove("error") cuando la tirada sale bien. El estilo de .error lo pones en tu CSS.
        resultado1.textContent = "No dispones de suficientes monedas";
    }

});


invocaMulti.addEventListener("click", () =>{
    
    // REVISIÓN: COSTE_MULTI en vez de 1280 (aquí y en la resta de abajo).
    if(cantidadMonedas>=1280){

        cantidadMonedas-=1280;
        // REVISIÓN (bug): los "\n" no hacen salto de línea dentro de un <p>, así que las 8 tiradas salen seguidas.
        // Mejor crear un nodo por tirada (cambia el <p id="resultado8"> por un <ol>, ver HTML):
        //   resultado8.replaceChildren();   // vacía la lista anterior (en vez de let resultado = "")
        // y dentro del bucle, en lugar de resultado += ...:
        //   const item = document.createElement("li");
        //   item.textContent = `¡${yokaiObtenido.nombre}! - Rango ${yokaiObtenido.rango}`;
        //   item.classList.add(`rango-${yokaiObtenido.rango}`);   // para colorear por rango en tu CSS
        //   resultado8.append(item);
        let resultado="";
        // REVISIÓN: igual que en x1, pinta las monedas después del bucle, cuando ya se han sumado las de los repetidos.
        monedas.textContent = cantidadMonedas;
    
        // REVISIÓN: TIRADAS_MULTI en vez de 8.
        for(let i=0; i<8; i++){
            
            cantidadTiradas++;

            // REVISIÓN: borra este bloque comentado. Es la versión antigua y ya queda guardada en el historial de git.
            /*if(i===7){

                yokaiObtenido = generaYokai(true);

                yokaiObtenidos.push(yokaiObtenido);
                resultado8.textContent = `Has obtenido a ${yokaiObtenido.nombre} !! Rango ${yokaiObtenido.rango}`;
            } else {*/
            //Esta línea ya nos devuelve un booleano porque solo va comparando que la tirada sea la 8 
            // REVISIÓN: i === TIRADAS_MULTI - 1 (así, si cambia el número de tiradas, la garantía se mantiene).
            const garantiaA = i === 7;

            const yokaiObtenido = generaYokai(garantiaA);
            darRecompensa(yokaiObtenido);
            resultado += `${i + 1}. Has obtenido a ${yokaiObtenido.nombre}!! - Rango ${yokaiObtenido.rango}\n`;
            
        }    

        tiradas.textContent = cantidadTiradas;
        // REVISIÓN: con el <ol> y createElement de arriba, esta línea (y la variable resultado) sobran.
        resultado8.textContent = resultado;

    } else {
        // REVISIÓN: si resultado8 pasa a ser un <ol>, mejor mostrar este aviso en el <p id="avisos"> común
        // para los dos botones (ver HTML), con classList.add("error").
        resultado8.textContent = "No dispones de suficientes monedas";
    }

});


const generaYokai = (garantiaA) =>{

    // REVISIÓN: documenta aquí lo que no es obvio, la tabla de probabilidades:
    //   E 35 % · D 25 % · C 20 % · B 12 % · A 7 % · S 1 %
    const probabilidad = Math.random() * 100;
    let rango;

    // REVISIÓN (bug): este if asigna el rango, pero la ternaria de abajo lo SOBRESCRIBE siempre, así que las
    // garantías nunca se cumplen. Junta todo en un único if / else if / else:
    //   if (/* condición de la garantía de S */) {
    //       rango = "S";
    //   } else if (garantiaA) {
    //       rango = probabilidad >= 99 ? "S" : "A";   // "A o superior": si ya iba a salir S, no lo bajes
    //   } else if (probabilidad < 35) {
    //       rango = "E";
    //   } else if ... (resto de la tabla)
    // REVISIÓN (pista): "=== 80" solo se cumple en la tirada 80 total, no cada 80 tiradas sin S. Enlázalo con
    // la pista del contador del principio del archivo: ¿dónde lo compruebas y dónde lo reinicias?
    if(cantidadTiradas === 80){
        rango = "S";
    } else if (garantiaA){
        rango = "A";
    }

    // REVISIÓN: una ternaria sirve para ELEGIR un valor, no para ejecutar asignaciones. Si la mantienes, que
    // devuelva el valor: rango = probabilidad < 35 ? "E" : probabilidad < 60 ? "D" : ... : "S";
    // (aunque con el arreglo de arriba, el if / else if ya lo cubre todo y esto sobra).
    probabilidad < 35  ? rango = "E":
    probabilidad < 60 ? rango = "D":
    probabilidad < 80 ? rango = "C":
    probabilidad < 92 ? rango = "B":
    probabilidad < 99 ? rango = "A":
                        rango = "S";

    // REVISIÓN: estos comentarios explican qué hacen filter y Math.floor, y eso ya se ve en el código.
    // Acórtalos y explica el porqué (p. ej. "elegimos un yokai al azar dentro del rango que ha salido").
    //Vamos a filtrar los yokai que se correspondan con el rango que haya salido
    //yokai es una variable auxiliar creada por filter en la que se va guardando un yokai por vuelta
    // REVISIÓN: "yokaiGenerados" confunde, porque no se genera nada: son los candidatos del rango → yokaisDelRango.
    const yokaiGenerados = yokais.filter(yokai => yokai.rango === rango);

    //Ahora de la lista de los yokai generados de ese rango escogeremos uno aleatorio
    //Básicamente multiplicamos un numero random (0-1) por la longitud y redondeamos hacia a bajo y obtendremos el yokai que queremos
    const posicion = Math.floor(Math.random() * yokaiGenerados.length);

    return yokaiGenerados[posicion];
};


const darRecompensa = (yokai) =>{

    //Comprobamos si el yokai que nos acaba de tocar está ya en nuestra coleccion de yokai 
    const duplicado = yokaiObtenidos.some(y => y.nombre === yokai.nombre);

    // REVISIÓN: ternaria usada para ejecutar acciones, y "== true" sobra porque duplicado ya es booleano. Mejor:
    //   if (duplicado) {
    //       cantidadMonedas += COSTE_TIRADA;
    //   } else {
    //       yokaiObtenidos.push(yokai);
    //   }
    // REVISIÓN (pista): cuando hagas el Medalium, este else es el sitio donde sabes que un yokai es nuevo.
    // Y si quieres avisar de "repetido" en el mensaje, ¿cómo podría enterarse el listener? (piensa en return).
    duplicado == true ? cantidadMonedas+=160 : yokaiObtenidos.push(yokai);
} // REVISIÓN: falta ";" tras la llave, como en generaYokai (es una const con función flecha). Igual en las de abajo.

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