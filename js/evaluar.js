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
        return 0;
     }else if(isNaN(resultado) == false){
        ultimoResultado = numeros[0].toString();
        return numeros[0];
    } else {
        ultimoResultado = "0";
        return 0;
    }
} else{
    return 0;
}
}
