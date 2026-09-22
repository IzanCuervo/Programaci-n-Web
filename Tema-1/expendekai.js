//Variables

let cantidadMonedas=0;
let cantidadTiradas=0;
let yokaiObtenidos = [];

const monedas = document.querySelector("#monedas");
const tiradas = document.querySelector("#tiradas");

const invocaSingle = document.querySelector("#invocacion1");
const invocaMulti = document.querySelector("#invocacion8");
const botonMedalium = document.querySelector("#medalium");

const medalium = document.querySelector("#contenidoMedalium");

const yokais = [
    // Rango E
    { nombre: "Wazzat", rango: "E" },
    { nombre: "Dismarelda", rango: "E" },
    { nombre: "Negatibuzz", rango: "E" },
    { nombre: "Illoo", rango: "E" },
    { nombre: "Manjimutt", rango: "E" },

    // Rango D
    { nombre: "Komasan", rango: "D" },
    { nombre: "Komajiro", rango: "D" },
    { nombre: "Tattletell", rango: "D" },
    { nombre: "Hungramps", rango: "D" },
    { nombre: "Mochismo", rango: "D" },

    // Rango C
    { nombre: "Jibanyan", rango: "C" },
    { nombre: "Whisper", rango: "C" },
    { nombre: "Cadin", rango: "C" },
    { nombre: "Walkappa", rango: "C" },
    { nombre: "Hidabat", rango: "C" },

    // Rango B
    { nombre: "Roughraff", rango: "B" },
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
    { nombre: "Elder Bloom", rango: "S" },
    { nombre: "Damona", rango: "S" },
    { nombre: "Slimamander", rango: "S" },
    { nombre: "Snartle", rango: "S" },
    { nombre: "Goldenyan", rango: "S" }
];


invocaSingle.addEventListener("click", () =>{
    
    if(cantidadMonedas>=160){
        cantidadMonedas-=160;
        monedas.textContent = cantidadMonedas;
        
        cantidadTiradas++;
        tiradas.textContent = cantidadTiradas;
    } else {
        print("No dispones de suficientes monedas");
    }

});


invocaMulti.addEventListener("click", () =>{
    
    if(cantidadMonedas>=1280){

    } else {
        print("No dispones de monedas");
    }

});


const generaYokai = () =>{

    const probabilidad = Math.random() * 100;
    let rango;

    probabilidad < 35  ? rango = "E":
    probabilidad < 60 ? rango = "D":
    probabilidad < 80 ? rango = "C":
    probabilidad < 92 ? rango = "A":
    probabilidad < 99 ? rango = "S":

};

const darRecompensa = (yokai) =>{

}

const actualizaMedalium = (yokai) =>{

}

const muestraMedalium = () =>{

}