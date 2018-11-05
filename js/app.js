document.querySelectorAll(".boton")
.forEach(function (el) {

    el.addEventListener("click",
        function () {

         escribir(el.getAttribute("data-tipo"),
          el.value);

        });
});

var pantalla = document.getElementById("pantalla");
var introducirOperador = false;
var introducirPunto = true;
var hayResultado = false;
var ultimoResultado;
var introducirMasMenos = true;
var introducirDecimal = true;
var introducirUltimo = true;

/*Permite introducir un caracter en función de si está o no
    permitido dicho caracter*/
function escribir(tipo, valor) {

//Siempre podemos introducir un número
    if (tipo === "numero") {
        introducirOperador = true;
        introducirPunto = true;
        introducirDecimal = true;
        introducirMasMenos = true;
        pantalla.value += valor;
    }
//Si introducimos un operador, no podremos introducir otro.
    if (introducirOperador && tipo === "operador") {
        pantalla.value += valor;
        introducirOperador = false;
        introducirPunto = true;
        introducirDecimal = true;
        introducirMasMenos = true;
        introducirUltimo = true;
    }
//Si borramos toda la pantalla, se restablecen los valores.
    if (tipo === "borrartotal") {
        pantalla.value = "";
        introducirOperador = false;
        introducirPunto = true;
        introducirMasMenos = true;
        introducirDecimal = true;
        introducirUltimo = true;
    }
/*En caso de borrar el ultimo valor, se comprobará
    cuál es ahora el ultimo valor y se permitirán
    unos u otros valores nuevos*/
    if (tipo === "borrarultimo") {
        pantalla.value = pantalla.value.slice(0, -1);
//Si es un operador no podremos introducir otro
        if ("+-*/".indexOf(pantalla.value.charAt(
            pantalla.value.length - 1)) > -1) {
            introducirOperador = false;
            introducirDecimal = true;
            introducirMasMenos = true;
            introducirUltimo = true;
//Si es un decimal no podremos introducir ni operador ni decimal.
        } else if (".".indexOf(pantalla.value.charAt(
            pantalla.value.length - 1)) > -1) {
            introducirOperador = false;
            introducirDecimal = false;
            introducirMasMenos = false;
//En caso de ser un número se puede introducir cualquier valor.
        } else {
            introducirOperador = true;
            introducirDecimal = true;
            introducirPunto = true;
            introducirMasMenos = true;
            introducirUltimo = true;
        }
//Si existe un resultado, se devuelve y permite introducir todo.
    }
    if (introducirUltimo && tipo === "cogerultimo" && hayResultado) {
        for(var i = 0; i<ultimoResultado.length;i++){
            if('.'.indexOf(ultimoResultado.charAt(i)) > -1){
                introducirUltimo = false;
                break;
            } 
        }
        pantalla.value += ultimoResultado;
        introducirOperador = true;
        introducirPunto = true;
        introducirDecimal = true;
    }
//Si metemos un valor negativo, no podremos introducir otro.
    if (tipo === "masmenos" && introducirMasMenos) {
        pantalla.value += valor;
        introducirMasMenos = false;
        if(parseFloat(ultimoResultado)>=0){
            introducirUltimo = true;
        } else{
            introducirUltimo = false;
        }
    }
/*Si se quiere introducir un decimal,se comprobará toda la cadena,
    buscando si antes de llegar al final de la cadena ha habido
    o no un decimal. En caso de que lo haya habido y posteriormente
    no exista ningún operador, no dejaremos introducir otro decimal,
    en caso de que haya algun operador posterior al punto sí que dejaremos
    introducir un decimal. */

    if (introducirDecimal && tipo === "decimal") {
        for (var i = 0; i < pantalla.value.length; i++) {
            switch (pantalla.value.charAt(i)) {
                case ".": introducirPunto = false;
                          introducirUltimo = false;
                    break;
                case "*": introducirPunto = true;
                    break;
                case "/": introducirPunto = true;
                    break;
                case "+": introducirPunto = true;
                    break;
                case "-": introducirPunto = true;
                    break;

            }
//En caso de introducir el decimal, no dejará introducir un operador.
        }
        if (introducirPunto) {
            introducirOperador = false;
            pantalla.value += valor;
        }

    }
//Si pulsamos sobre el resultado, se llamará a la función.
    if (tipo === "resultado" && pantalla.value!="") {
        evaluar(pantalla.value);
        hayResultado = true;
        for(var i = 0; i<ultimoResultado.length;i++){
            if('.'.indexOf(ultimoResultado.charAt(i)) > -1){
                introducirUltimo = false;
            } 
        }
    
    }
}
//Convierte la cadena de la pantalla en un array de numeros y operaciones.
function convertirString(string) {
    var arrayNumeros = []; //Será el array con los numeros y operadores.
    var valorActual = ""; //El valor actual del caracter dentro del bucle.

/*Si el valor de  i es alguno de los valores "+-/*",
significará que es un operador, por tanto,
se introduce al array el valorActual(numero) y el operador(charAt(i)).
El valorActual se deja vacio otra vez para poder meter otro numero
sin que se concatene con el anterior. En caso de que el valor de la i
no sea ningún operador, seguirá concatenando
numeros hasta que encuentre uno.*/
    for (var i = 0; i < string.length; i++) {
        if ("+-/*".indexOf(string.charAt(i)) > -1) {
            /*Si estamos en la ultima posición del string
            y el valor es un operador no hacemos nada.*/
            if (i !== string.length - 1) {
                arrayNumeros.push(valorActual, string.charAt(i));
                valorActual = "";
            }
        } else {
            valorActual += string.charAt(i);
        }
    }
/*Debido a que introducimos los valores en pareja,
el ultimo valor ha de ser un número, por eso
lo introducimos en caso de que lo sea.*/
    if (valorActual != "") {
        arrayNumeros.push(valorActual);
    }
/*La unica forma de tener un espacio en blanco es
    utilizar números negativos, por eso en caso de tenerlo
    nos quedaremos solo con el número negativo y eliminaremos
    el espacio en blanco.*/
    for(var z = 0; z<arrayNumeros.length;z++){
        if(arrayNumeros[z] === ""){
            if('-'.indexOf(arrayNumeros[z+1]) > -1){
            arrayNumeros.splice(z,3,"-"+arrayNumeros[z+2]);
            } else{
            arrayNumeros.splice(z,4);
            }
        }
    }

    return arrayNumeros;
}
/*Estas funciones hacen las operaciones, en caso de que devuelva un 
    numero decimal se redondea a 2 decimales, en caso de que no devuelva
    decimales se eliminan los 0 restantes con el parseFloat*/
function sumar(a, b) {
    return parseFloat((parseFloat(a) + parseFloat(b)).toFixed(2));
}
function restar(a, b) {
    return parseFloat((parseFloat(a) - parseFloat(b)).toFixed(2));
}
function dividir(a, b) {
    return parseFloat((parseFloat(a) / parseFloat(b)).toFixed(2));
}
function multiplicar(a, b) {
    return parseFloat((parseFloat(a) * parseFloat(b)).toFixed(2));
}



//Comprueba si el array es correcto.
function comprobar(string){
    var numeros = convertirString(string);
    var num = 0;
    var oper = 0;

    for(var i = 0;i<numeros.length;i++){
        if('*-+/'.indexOf(numeros[i]) > -1){
            oper++;
        } else{
            num++;
        }
    }
    if(oper+1 === num){
        return true;

    }else{
        return false;
    }
}
//Realiza todas las operaciones sobre el array.
function evaluar(string) {
    
    if(comprobar(string)){
    var resultado = "";
    var numeros = convertirString(string);
    var guardarOperaciones = convertirString(string);
    var contador = 0;
    var multiplicaciones = 0;
    var divisiones = 0;
/*Se cuentan en caso de que haya las multiplicaciones
    y divisiones*/
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] == "*") {
            multiplicaciones++;
        }
        if (numeros[i] == "/") {
            divisiones++;
        }
    }
/*Mientras siga habiendo multiplicaciones y divisones 
    se seguiran operando y sustituyendo el resultado
    con los números que se han operado*/
    while (multiplicaciones != 0 || divisiones != 0) {
        while (divisiones != 0 || multiplicaciones != 0) {
            if (numeros[contador] === "*") {
                resultado = multiplicar(numeros[contador - 1],
                    numeros[contador + 1]);
                numeros.splice(contador - 1, 3, resultado);
                multiplicaciones--;
                contador = 0;
            } else if (numeros[contador] === "/") {
                resultado=dividir(numeros[contador-1],numeros[contador + 1]);
                numeros.splice(contador - 1, 3, resultado);
                divisiones--;
                contador = 0;
            } else {
                contador++;
            }
        }
    }
/*Lo mismo para las sumas, mientras no haya solo un numero en el array,
    lo que significará que se ha llegado al resultado, se seguiran
    sumando y restando los numeros y sustituyendo los resultados.*/
    while (numeros.length != 1) {
        if (numeros[contador] === "+") {
            resultado = sumar(numeros[contador - 1], numeros[contador + 1]);
            numeros.splice(contador - 1, 3, resultado);
            contador = 0;
        } else if (numeros[contador] === "-") {
            resultado = restar(numeros[contador - 1], numeros[contador + 1]);
            numeros.splice(contador - 1, 3, resultado);
            contador = 0;
        } else {
            contador++;
        }
    }
//Si el resultado es correcto se devuelve, si no devuelve 0.
    
     if(numeros[0] == Infinity){
        pantalla.value = "0";
        return 0;
     }else if(isNaN(resultado) == false){
        pantalla.value = numeros[0].toString();
        ultimoResultado = numeros[0].toString();
        return numeros[0];
    } else {
        pantalla.value = "0";
        ultimoResultado = "0";
        return 0;
    }
} else{
    return 0;
}
}
