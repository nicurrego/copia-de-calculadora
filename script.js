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
const pantalla = document.querySelector("span")
const calculadora = document.querySelector("div.calculadora");


console.log(calculadora);

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
  console.log(e.target);
  
  
})
