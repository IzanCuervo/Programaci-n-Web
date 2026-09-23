//let numero = 0;
let intentos = 0;
const input = document.querySelector("#numero");
const boton = document.querySelector("#boton");

const  secreto = Math.floor(Math.random() * 100) + 1;

boton.addEventListener("click", () => {
    //numero = Number(prompt("Introduzca un numero "));
    let numero = Number(input.value);

    /*if(secreto < numero){
        console.log("El numero es mayor");
        intentos++;
    } else if (secreto > numero){
        console.log("El numero es menor");
        intentos++;
    } else {
        console.log("Enhorabuena has acertado el numero")
    }*/
    if(numero > 0 && numero <=100 ){
        intentos ++;

        numero > secreto ? console.log("El numero secreto es menor") :
        numero < secreto ? console.log("El numero secreto es es mayor") :
                           console.log("Enhorabuena has acertado el numero"); 

        if(numero === secreto){
            boton.disabled = true;
        }
        
    } else {
        console.log("Introduce un numero valido");
    }
});


