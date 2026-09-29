//Variables

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
const generaMonedas = document.querySelector("#generaMonedas");

const medalium = document.querySelector("#contenidoMedalium");

const resultado = document.querySelector("#resultado");
const error = document.querySelector("#error");

// REVISIÓN: cada yokai ya tiene la ruta de su vídeo en "video". Falta crear el <video> al mostrar el
// resultado de la tirada.
const yokais = [
    // Rango E
    { nombre: "Komemo", rango: "E", video: "videos/komemo.webm" },
    { nombre: "Tantroni", rango: "E", video: "videos/tantroni.webm" },
    { nombre: "Alcaldero", rango: "E", video: "videos/alcaldero.webm" },
    { nombre: "Alga", rango: "E", video: "videos/alga.webm" },
    { nombre: "Yopaso", rango: "E", video: "videos/yopaso.webm" },

    // Rango D
    { nombre: "LaFalota", rango: "D", video: "videos/laFalota.webm" },
    { nombre: "Cupistolo", rango: "D", video: "videos/cupistolo.webm" },
    { nombre: "Cotilleja", rango: "D", video: "videos/cotilleja.webm" },
    { nombre: "Jibanyan", rango: "D", video: "videos/jibanyan.webm" },
    { nombre: "Komajiro", rango: "D", video: "videos/komajiro.webm" },

    // Rango C
    { nombre: "Iluho", rango: "C", video: "videos/iluho.webm" },
    { nombre: "Telespejo", rango: "C", video: "videos/telespejo.webm" },
    { nombre: "Cuesco", rango: "C", video: "videos/cuesco.webm" }, 
    { nombre: "Puffipatitas", rango: "C", video: "videos/puffipatitas.webm" },
    { nombre: "Ratelle", rango: "C", video: "videos/ratelle.webm" },

    // Rango B
    { nombre: "Darumacho", rango: "B", video: "videos/darumacho.webm" },
    { nombre: "Rhinoggin", rango: "B", video: "videos/rhinoggin.webm" },
    { nombre: "Espinyan", rango: "B", video: "videos/espinyan.webm" },
    { nombre: "Agon", rango: "B", video: "videos/agon.webm" },
    { nombre: "Habilgarra", rango: "B", video: "videos/habilgarra.webm" },

    // Rango A
    { nombre: "Pandanoko", rango: "A", video: "videos/pandaNoko.webm" },
    { nombre: "Reversa", rango: "A", video: "videos/reversa.webm" },
    { nombre: "Robonyan", rango: "A", video: "videos/robonyan.webm" },
    { nombre: "Negasus", rango: "A", video: "videos/negasus.webm" },
    { nombre: "Timidemonio", rango: "A", video: "videos/timidemonio.webm" },

    // Rango S
    { nombre: "Kyubi", rango: "S", video: "videos/kyubi.webm" },
    { nombre: "Venocto Oscuro", rango: "S", video: "videos/venoctoOscuro.webm" },
    { nombre: "Tengu", rango: "S", video: "videos/tengu.webm" },
    { nombre: "Komasura", rango: "S", video: "videos/komasura.webm" },
    { nombre: "Papa Rayo", rango: "S", video: "videos/papaRayo.webm" }
];

const muestraDatos = () =>{
    monedas.textContent = cantidadMonedas;
    tiradas.textContent = cantidadTiradas;
};

//Pintamos el marcador al cargar la página para que coincida con los valores iniciales
muestraDatos();

invocaSingle.addEventListener("click", () =>{
    
    realizaInvocacion(1);

});


invocaMulti.addEventListener("click", () =>{
    
    realizaInvocacion(8);
   
});

generaMonedas.addEventListener("click", () =>{
    cantidadMonedas += COSTE_TIRADA*4;
    error.textContent="";
    muestraDatos();
});

botonMedalium.addEventListener("click", () =>{
    //Con toggle alternamos la etiqueta oculto para que el CSS nos permita mostrar el Medalium
    medalium.classList.toggle("oculto");
});

const realizaInvocacion = (numInvocaciones) => {
    
    const costeTotal = numInvocaciones*COSTE_TIRADA;

    if(cantidadMonedas>=costeTotal){
        cantidadMonedas-=costeTotal;
        error.textContent="";
        resultado.textContent="";
            for(let i=0; i<numInvocaciones; i++){
                cantidadTiradas++;
            
                //Esta línea ya nos devuelve un booleano porque solo va comparando que la tirada sea la 8 
                const garantiaA = i === 7;
                const yokaiObtenido = generaYokai(garantiaA);

                darRecompensa(yokaiObtenido);
                //Creamos un <li> por cada tirada y lo añadimos a la lista de resultados
                const itemResultado = document.createElement("li");
                itemResultado.textContent = `Has obtenido a ${yokaiObtenido.nombre}!! - Rango ${yokaiObtenido.rango}`;
                resultado.append(itemResultado);
            
            }
            
            muestraDatos();
    } else {
        error.textContent = "No dispones de suficientes monedas";
    
    }
};


const generaYokai = (garantiaA) =>{

    // Probabilidades = E 35 % · D 25 % · C 20 % · B 12 % · A 7 % · S 1 %
    const probabilidad = Math.random() * 100;
    let rango;

   
    // Si nuestro pity es superior o igual a 80 entonces se nos garantiza un rango S
    //El menos 1 es porque nuestro pity empiza a contar desde 0 
    if(pity >= TIRADAS_PITY_S-1){
        rango = "S";
    //Si la garantiaA es true entonces aseguramos rango A
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
        actualizaMedalium(yokai);
    }
    // REVISIÓN (pista, opcional): si quieres avisar de "repetido" en el mensaje de la tirada, ¿cómo podría
    // enterarse realizaInvocacion de que el yokai era repetido? (piensa en return).
};

const actualizaMedalium = (yokai) =>{
    //Como la letra final de cada sección es lo mismo que el rango lees directamente por el rango del yokai
    const seccionRango = document.querySelector(`#medalium-${yokai.rango}`);
    
    //Creamos la medalla del yokai
    const medalla = document.createElement("div");
    medalla.textContent = yokai.nombre;
    //con classList.add añado las clases para el posterior CSS
    medalla.classList.add("medalla", `rango-${yokai.rango}`);
    //Meto la medalla a su respectiva sección
    seccionRango.append(medalla);
};



// REVISIÓN (pista, BONUS + eventos de teclado): modo oscuro con una tecla secreta. Investiga el evento
// "keydown" (¿sobre qué elemento lo escucharías para que funcione en toda la página?) y la propiedad
// key del evento. Para los colores, igual que con el Medalium: una clase que alternas y defines en tu CSS.