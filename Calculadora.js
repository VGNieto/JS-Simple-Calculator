var numero = false;
var punto = true;
var seCalculo = false;
var pantalla;
var ultimoResultado;
var masmenos = true;

function escribir(tipo,valor){
    pantalla = document.getElementById("pantalla");

    if(tipo ==="numeros"){
        numero = true;
        pantalla.value += valor;
    }
    if(numero && tipo==="operador" ){
        pantalla.value += valor;
        numero = false;
        masmenos = true;
    }
    if(tipo === "borrartotal"){
        pantalla.value = "";
    }
    if(tipo === "borrarultimo"){
        pantalla.value = pantalla.value.slice(0,-1);
        numeros.slice(0,-1);
    }
    if(tipo === "cogerultimo" && seCalculo){
        pantalla.value += ultimoResultado;
        numero = true;
    }
    if(tipo === "masmenos" && masmenos){
        pantalla.value += valor;
        masmenos = false;
    }

    if(numero && tipo === "decimal"){
        for(var i = 0; i<(pantalla.value).length;i++){
            switch((pantalla.value[i])){
                case ".": punto = false;
                            break;
                case "*": punto = true;
                            break;
                case "/": punto = true;
                            break;
                case "+": punto = true;
                            break;
                case "-": punto = true;
                            break;
            }
        }
        if(punto){
            numero = false;
            pantalla.value += valor;
        }
    }

    if(tipo === "resultado"){
        evaluar(pantalla.value);
        seCalculo = true;
    }
}

function convertirString(string){
    var arrayNumeros = []; //Será el array con los numeros y operadores.
    var valorActual = ""; //El valor actual del caracter dentro del bucle.
/*Si el valor de  i es alguno de los valores "+-/*",
significará que es un operador, por tanto,
se introduce al array el valorActual(numero) y el operador(charAt(i)).
El valorActual se deja vacio otra vez para poder meter otro numero
sin que se concatene con el anterior. En caso de que el valor de la i
no sea ningún operador, seguirá concatenando
numeros hasta que encuentre uno.*/
    for(var i = 0; i<string.length;i++){
        if("+-/*".indexOf(string.charAt(i)) > -1 ){
/*Si estamos en la ultima posición del string
y el valor es un operador no hacemos nada.*/
            if(i!==string.length-1 ){
                arrayNumeros.push(valorActual,string.charAt(i));
                valorActual = "";
            }
        } else {
            valorActual += string.charAt(i);
        }
    }
/*Debido a que introducimos los valores en pareja,
el ultimo valor ha de ser un número, por eso
lo introducimos en caso de que lo sea.*/
    if(valorActual != ""){
        arrayNumeros.push(valorActual);
    }
    for(var z = 0; z<arrayNumeros.length;z++){
        if(arrayNumeros[z] === ""){
            arrayNumeros.splice(z,3,"-"+arrayNumeros[z+2]);
        }
    }
    return arrayNumeros;
}

function sumar(a,b){
    return (parseFloat(a)+parseFloat(b)).toString();
}
function restar(a,b){
    return (parseFloat(a)-parseFloat(b)).toString();
}
function dividir(a,b){
    return (parseFloat(a)/parseFloat(b)).toString();
}
function multiplicar(a,b){
    return (parseFloat(a)*parseFloat(b)).toString();
}

function evaluar(string){
    var resultado = "";
    var numeros = convertirString(string);
    var contador = 0;
    var multiplicaciones = 0;
    var divisiones = 0;
    for(var i = 0; i<numeros.length;i++){
        if(numeros[i] == "*"){
            multiplicaciones++;
        }
        if(numeros[i]== "/"){
            divisiones++;
        }
    }

    while(multiplicaciones !=0 || divisiones != 0){
        while(divisiones != 0 || multiplicaciones!= 0){
            if(numeros[contador] === "*"){
                resultado = multiplicar(numeros[contador-1],
                    numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                multiplicaciones--;
                contador=0;
            } else if(numeros[contador] === "/"){
                resultado = dividir(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                divisiones--;
                contador=0;
            } else{
                contador++;
            }
        }
    }
    while(numeros.length!=1){
            if(numeros[contador] === "+"){
                resultado = sumar(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                contador=0;
            }else if(numeros[contador] === "-"){
                resultado = restar(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                contador=0;
            }else{
                contador++;
            }
        }
    pantalla.value = numeros;
    ultimoResultado = numeros[0];
    return numeros;
}
