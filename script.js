const clear = document.getElementById("c")
const parentesis = document.getElementById("( )")
const porcentaje = document.getElementById("%")
const dividir = document.getElementById("/")
const siete = document.getElementById("7")
const ocho = document.getElementById("8")
const nueve = document.getElementById("9")
const multiplicar = document.getElementById("*")
const cuatro = document.getElementById("4")
const cinco = document.getElementById("5")
const seis = document.getElementById("6")
const restar = document.getElementById("-")
const uno = document.getElementById("1")
const dos = document.getElementById("2")
const tres = document.getElementById("3")
const sumar = document.getElementById("+")
const nose = document.getElementById("+/-")
const cero = document.getElementById("0")
const decimal = document.getElementById(".")
const igual = document.getElementById("=")
const history = document.getElementById("history")
const digito1 = document.getElementById("n1") // color salmon
const operador = document.getElementById("operador") // color greenyellow
const digito2 = document.getElementById("n2") // color violeta
const calculadora = document.querySelector("div.calculadora");
const res = document.getElementById("resultado")

function operar(n1, simbolo, n2){
    let resultado;
    n1 = parseFloat(n1) // sin este paso js tomará los numeros como texto
    n2 = parseFloat(n2)
    switch (simbolo) {
      case "+": resultado = n1 + n2;
      break;
      case "-": resultado = n1 - n2;
      break;
      case "*": resultado = n1 * n2;
      break;
      case "/": resultado = n1 / n2;
      break
      default: resultado = "simbolo inexistente"
      break
    } 
    res.textContent = resultado
    console.log(resultado)
}



calculadora.addEventListener('click', (e) =>{
  const o = "digito1.textContent, operador.textContent, digito2.textContent"
  switch (e.target.id) {
    case "c":  digito1.textContent = "";
    operador.textContent = "";
    digito2.textContent = "";
    resultado.textContent = "";
    break;
    case "=":  operar(o) ; // añadí la funcion de operar en caso de que el usuario digite un operador luego de haber digitado el n2.
    break;
    case "+": if(digito2.textContent !== ""){
      operar(o);
      operador.append("+")
    } else{
      operador.textContent = ""
      operador.append("+")
    };
    break;
    case "-":  operador.append("-");
    break;
    case "*":  operador.append("*");
    break;
    case "/":  operador.append("/");
    break;
    case "+/-":  nose;
    break;
    case "history":  showHistory();
    break;
    case "( )":  digito1.append("()"); //corregir para que sea uno de apertura y uno de cierre.
    break;
    case "%":  digito1.append("%"); 
    break;
    case ".":  if(digito1.textContent === ""){
      digito1.append("0.")
    } else{
      digito1.append(".")
    };  
    break;
    case "0": if(operador.textContent === ""){
      digito1.append("0")
    } else {
      digito2.append("0")
    };
    break;
    case "1":  if(operador.textContent === ""){
      digito1.append(1)
    } else {
      digito2.append(1)
    };
    break;
    case "2":  if(operador.textContent === ""){
      digito1.append("2")
    } else {
      digito2.append("2")
    };
    break;
    case "3":  if(operador.textContent === ""){
      digito1.append("3")
    } else {
      digito2.append("3")
    };
    break;
    case "4":  if(operador.textContent === ""){
      digito1.append("4")
    } else {
      digito2.append("4")
    };
    break;
    case "5":  if(operador.textContent === ""){
      digito1.append("5")
    } else {
      digito2.append("5")
    };
    break;
    case "6":  if(operador.textContent === ""){
      digito1.append("6")
    } else {
      digito2.append("6")
    };
    break;
    case "7":  if(operador.textContent === ""){
      digito1.append("7")
    } else {
      digito2.append("7")
    };
    break;
    case "8":  if(operador.textContent === ""){
      digito1.append("8")
    } else {
      digito2.append("8")
    };
    break;
    case "9":  if(operador.textContent === ""){
      digito1.append("9")
    } else {
      digito2.append("9")
    };
    break;
  }
})
