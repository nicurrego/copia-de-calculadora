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
const contenidoHistorial = [];

function operar(n1, simbolo, n2){
  // Almacena la operación actual en el historial y en el localStorage
  const operacionActual = [n1, simbolo, n2];
  contenidoHistorial.push(operacionActual);
  storehistorialInLocalStorage(operacionActual);
  
  let resultado;
  // Convierte los números de texto a float
  n1 = parseFloat(n1) 
  n2 = parseFloat(n2)

  // Realiza la operación según el símbolo
  switch (simbolo) {
    case "+": resultado = n1 + n2;
      break;
    case "-": resultado = n1 - n2;
      break;
    case "*": resultado = n1 * n2;
      break;
    case "/": resultado = n1 / n2;
      break;
    default: resultado = "simbolo inexistente";
      break;
  } 
  // Limpia los campos y muestra el resultado
  digito1.textContent = "";
  operador.textContent = "";
  digito2.textContent = "";
  res.textContent = resultado;
  res.removeAttribute("id");
  res.classList.add("continue");
}

// OPERACIONES DE CALCULADORA
let c; // contador para el case ("( )")
calculadora.addEventListener('click', (e) => {
  // Si el resultado está presente, reiniciar para una nueva operación
  if (res.classList.contains("continue")) {
    digito1.textContent = res.textContent;
    operador.textContent = "";
    digito2.textContent = "";
    res.textContent = "";
    res.id = "resultado";
    res.classList.remove("continue");
  }

  // Objeto que contiene los valores actuales de la operación
  const o = {
    n1: digito1.textContent,
    operador: operador.textContent,
    n2: digito2.textContent
  };

  // Maneja las distintas acciones según el botón presionado
  switch (e.target.id) {
    case "c":
      // Limpia todos los campos
      res.textContent = "";
      digito1.textContent = "";
      operador.textContent = "";
      digito2.textContent = "";
      break;
    case "=":  
      // Realiza la operación
      operar(o.n1, o.operador, o.n2);
      break;
    // Operadores matemáticos
    case "+":
    case "-":
    case "*":
    case "/":
      if (digito2.textContent !== "") {
        operar(o.n1, o.operador, o.n2);
      }
      operador.textContent = e.target.id;
      break;
    case "+/-":
      // No implementado
      nose;
      break;
    case "history":
      // Muestra el historial
      showHistory();
      break;
    case "( )":
      // Maneja la apertura y cierre de paréntesis
      if (operador.textContent !== "" && c != 1) {
        digito2.append("(");
        c = 1;
      } else if (operador.textContent !== "" && c == 1) {
        digito2.append(")");
        c = 0;
      } else if (operador.textContent === "" && c != 1) {
        digito1.append("(");
        c = 1;
      } else {
        digito1.append(")");
        c = 0;
      }
      break;
    case "%":
      // No está funcionando correctamente
      if (digito2.textContent !== "") {
        operar(o.n1, o.operador, o.n2);
        operador.textContent = "%";
      } else {
        operador.textContent = "%";
      }
      break;
    case ".":
      // Agrega el punto decimal
      if (digito1.textContent === "") {
        digito1.append("0.");
      } else {
        digito1.append(".");
      }  
      break;
    // Maneja los dígitos del 0 al 9
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (operador.textContent === "") {
        digito1.append(e.target.id);
      } else {
        digito2.append(e.target.id);
      }
      break;
  }
});

// HISTORIAL
let c2 = 0; // Inicializamos el contador para el historial
let hola; // Declaramos la variable para el historial
history.addEventListener('click', () => { 
  const section = document.querySelector("section");

  if (c2 === 0) {
    // Crea la sección de historial si no existe
    hola = document.createElement("section");
    section.appendChild(hola);
    hola.classList.add("historial");
    hola.textContent = "Historial de Operaciones:\n";

    // Obtiene las operaciones almacenadas en localStorage y las muestra
    const ope = JSON.parse(localStorage.getItem("ope") || "[]");
    ope.forEach(op => {
      const p = document.createElement("p");
      p.textContent = `${op[0]} ${op[1]} ${op[2]}`;
      hola.appendChild(p);
    });
    
    c2 = 1;
  } else if (c2 === 1) {
    // Oculta el historial
    hola.style.display = "none";
    c2 = 2;
  } else if (c2 === 2) {
    // Muestra el historial
    hola.style.display = "block";
    c2 = 1;
  }
});

// Almacena la operación actual en el localStorage
function storehistorialInLocalStorage(operacionActual) {
  const ope = JSON.parse(localStorage.getItem("ope") || "[]");
  ope.push(operacionActual);
  localStorage.setItem("ope", JSON.stringify(ope));
}
