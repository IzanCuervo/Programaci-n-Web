// app.js — el oráculo elige su número secreto:
const secreto = Math.floor(Math.random() * 100) + 1;
console.log("(psst... el secreto es", secreto, "— quita esta línea al acabar)");

// Selección de elementos del DOM usando querySelector:
const intentoInput = document.querySelector('#intento');
const probarBtn = document.querySelector('#probar');
const respuestaTxt = document.querySelector('#respuesta');
const marcadorTxt = document.querySelector('#marcador');