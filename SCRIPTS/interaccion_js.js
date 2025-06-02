//alert("Script enlazado en archivo externo...")

console.log("Script enlazado en archivo externo cargado en consola...")

// Comentario de una línea

/*
Comentario
múltiple
línea
*/

// Tipos de datos
var texto_1 = 'Texto entre comillas simples " ';
var texto_2 = "Texto entre comillas dobles ' ";
var numero = 49;
var booleana = true;
const pi = 3.14;

console.log(texto_1);
console.log(texto_2);
console.log(numero);
console.log(booleana);
//console.log(pi = 2.24);

console.log("")
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);

console.log("")
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);

function mensaje(nombre) {
    console.log("Buen día " + nombre)
};

var funcion_anonima = function () {
    console.log("Función Anónima");
};

mensaje("Erick");

var nombres = ['Erick', 'Aguiles', 'Baeza']

nombres.forEach(
    function (nombre) {
        mensaje(nombre);
    }
);

for (i = 0; i < 10; i++) {
    console.log(i);
};