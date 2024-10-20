const buttons = ["c", "( )", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "=", "history"];
const elements = {};

// Selecciona todos los botones por su ID y los almacena en el objeto elements
buttons.forEach(id => {
  elements[id] = document.getElementById(id);
});

const digito1 = document.getElementById("n1"); // color salmon
const operador = document.getElementById("operador"); // color greenyellow
const digito2 = document.getElementById("n2"); // color violeta
const calculadora = document.querySelector("div.calculadora");
const res = document.getElementById("resultado");
const contenidoHistorial = [];

function operar(n1, simbolo, n2) {
  // Almacena la operación actual en el historial y en el localStorage
  const operacionActual = [n1, simbolo, n2];
  contenidoHistorial.push(operacionActual);
  storehistorialInLocalStorage(operacionActual);

  let resultado;
  // Convierte los números de texto a float
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  // Realiza la operación según el símbolo
  switch (simbolo) {
    case "+":
      resultado = n1 + n2;
      break;
    case "-":
      resultado = n1 - n2;
      break;
    case "*":
      resultado = n1 * n2;
      break;
    case "/":
      resultado = n2 !== 0 ? n1 / n2 : "Error: División por 0";
      break;
    default:
      resultado = "simbolo inexistente";
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
let c = 0; // contador para el manejo de paréntesis
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
      // Realiza la operación si todos los valores están presentes
      if (o.n1 && o.operador && o.n2) {
        operar(o.n1, o.operador, o.n2);
      }
      break;
    // Operadores matemáticos
    case "+":
    case "-":
    case "*":
    case "/":
      operador.textContent = e.target.id;
      break;
    case "+/-":
      // Cambia el signo del número
      if (operador.textContent === "") {
        digito1.textContent = parseFloat(digito1.textContent) * -1;
      } else {
        digito2.textContent = parseFloat(digito2.textContent) * -1;
      }
      break;
    case "history":
      // Muestra el historial
      showHistory();
      break;
    case "( )":
      // Maneja la apertura y cierre de paréntesis
      if (operador.textContent !== "" && c === 0) {
        digito2.append("(");
        c = 1;
      } else if (operador.textContent !== "" && c === 1) {
        digito2.append(")");
        c = 0;
      } else if (operador.textContent === "" && c === 0) {
        digito1.append("(");
        c = 1;
      } else {
        digito1.append(")");
        c = 0;
      }
      break;
    case "%":
      // Calcula el porcentaje del valor actual
      if (operador.textContent === "") {
        digito1.textContent = (parseFloat(digito1.textContent) / 100).toString();
      } else {
        digito2.textContent = (parseFloat(digito2.textContent) / 100).toString();
      }
      break;
    case ".":
      // Agrega el punto decimal si no está presente
      if (operador.textContent === "") {
        if (!digito1.textContent.includes(".")) {
          digito1.append(".");
        }
      } else {
        if (!digito2.textContent.includes(".")) {
          digito2.append(".");
        }
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
// Añadimos un listener para mostrar/ocultar el historial al hacer clic en el botón de historial
elements.history.addEventListener('click', () => { 
  const section = document.querySelector("#history-section");

  if (section) {
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
  }
});

// Almacena la operación actual en el localStorage
function storehistorialInLocalStorage(operacionActual) {
  const ope = JSON.parse(localStorage.getItem("ope") || "[]");
  ope.push(operacionActual);
  localStorage.setItem("ope", JSON.stringify(ope));
}

//Note que al digitar ej:
// 8 * 8; y nuevamente el operador *, no se ejecuta la operacion, pero si es posible cambiar el operador actual. Para ejecutar no queda de otra mas que utilizar el igual.

//quiero que al ocupar el espacio maximo horizontalmente en la pantalla, quiero que se agrege el contenido en una nueva linea y que la pantalla crezca verticalmente respectivamente. En otras palabras, que el ancho de la calculadora no se mueva.

//No se ejecuta correctamente el historial.

//No se ejecuta la multiplicaicon del digito1 o digito2 cuando en este se digita por ejemplo: '8(2)'