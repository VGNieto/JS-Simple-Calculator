var numero = false;
var punto = true;
var pantalla; 

function escribir(tipo,valor){

    pantalla = document.getElementById('pantalla');
    
    
    
    if(tipo ==="numeros"){
        numero = true;
        pantalla.value += valor;
        
    }

    if(numero && tipo==="operador" ){
        pantalla.value += valor;
        numero = false;
    }
    
    if(tipo === "borrartotal"){
        pantalla.value = '';
    }
    
    if(tipo === "borrarultimo"){
        pantalla.value = pantalla.value.slice(0,-1);
        numeros.slice(0,-1);
    }

    if(tipo === "masmenos"){
        pantalla.value += valor;
        
    }

    if(numero && tipo === "decimal"){
        
        for(var i = 0; i<(pantalla.value).length;i++){
            switch((pantalla.value[i])){
                case '.': punto = false;
                            break;
                case '*': punto = true;
                            break;
                case '/': punto = true;
                            break;
                case '+': punto = true;
                            break;
                case '-': punto = true;
                            break;  
            }
        }
        if(punto){
            numero = false;
            pantalla.value += valor;
        }
    }

    if(tipo === "resultado"){
        calcular();
    }
}

function convertirString(string){

    var arrayNumeros = []; //Será el array con los numeros y operadores.
    var valorActual = ''; //El valor actual del caracter dentro del bucle.

    for(var i = 0; i<string.length;i++){ //Bucle que recorre el string introducido.

        /* En caso de que el valor de la i sea alguno de los valores "+-/*", significará que es un operador, por tanto
            se introduce al array el valorActual(numero) y el operador(charAt(i)). El valorActual se deja vacio otra vez
            para poder meter otro numero sin que se concatene con el anterior.
            En caso de que el valor de la i no sea ningún operador, seguirá concatenando numeros hasta que encuentre uno.*/

        if('+-/*'.indexOf(string.charAt(i)) > -1 ){
            if(i!=string.length-1 ){ //Si estamos en la ultima posición del string y el valor es un operador no hacemos nada.
                arrayNumeros.push(valorActual,string.charAt(i)); 
                valorActual = '';
            }
        } else {
            valorActual += string.charAt(i);
        }

        
    }
    /*Debido a que introducimos los valores en pareja, el ultimo valor ha de ser un número, por eso
        lo introducimos en caso de que lo sea.*/
    if(valorActual != ''){
        arrayNumeros.push(valorActual);
    }

    if(arrayNumeros[0] == ''){
        var numerouno = "-"+arrayNumeros[2];
        arrayNumeros.splice(0,3,numerouno);
        
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

function calcular(){
    var resultado = '';
    var numeros = convertirString(pantalla.value);
    var arraySumasRestas = [];
    var contador = 0;
    var multiplicaciones = 0;
    var divisiones = 0;
   
    

    for(var i = 0; i<numeros.length;i++){
        if(numeros[i] == '*'){
            multiplicaciones++;
        }
        if(numeros[i]== '/'){
            divisiones++;
        }
    }

    while(multiplicaciones !=0 || divisiones != 0){
        while(divisiones != 0 || multiplicaciones!= 0){
            if(numeros[contador] === '*'){
                resultado = multiplicar(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                multiplicaciones--;
                contador=0;
                
            } else if(numeros[contador] === '/'){
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
        
            if(numeros[contador] === '+'){
                resultado = sumar(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                contador=0;
                
            } else if(numeros[contador] === '-'){
                resultado = restar(numeros[contador-1],numeros[contador+1]);
                numeros.splice(contador-1,3,resultado);
                contador=0;
            } else{
                contador++;
            }
        }
    


            
    

    
    console.log(numeros);
    console.log(resultado);
    pantalla.value = numeros;
    return resultado;

}
