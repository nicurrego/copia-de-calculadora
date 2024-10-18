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
const digito = document.querySelector("span")
const calculadora = document.querySelector("div.calculadora");


console.log(siete);

function operar(n1, simbolo, n2){
  {
    let resultado;
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
    console.log(resultado)
  }
}

calculadora.addEventListener('click', (e) =>{
  console.log(e.target.id);
  switch (e.target.id) {
    case "c":  digito.textContent = "";
    break;
    case "=":  operar();
    break;
    case "+":  digito.append("+");
    break;
    case "-":  digito.append("-");
    break;
    case "*":  digito.append("*");
    break;
    case "/":  digito.append("/");
    break;
    case "+/-":  nose;
    break;
    case "history":  showHistory();
    break;
    case "( )":  digito.append("()"); //corregir para que sea uno de apertura y uno de cierre.
    break;
    case "%":  digito.append("%"); 
    break;
    case ".":  digito.append(".");  
    break;
    case "0":  digito.append("0");
    break;
    case "1":  digito.append("1");
    break;
    case "2":  digito.append("2");
    break;
    case "3":  digito.append("3");
    break;
    case "4":  digito.append("4");
    break;
    case "5":  digito.append("5");
    break;
    case "6":  digito.append("6");
    break;
    case "7":  digito.append("7");
    break;
    case "8":  digito.append("8");
    break;
    case "9":  digito.append("9");
    break;
  }
})

const vamos = digito.append("")
