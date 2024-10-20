const buttons = ["c", "( )", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "=", "history"];
const elements = {};

buttons.forEach(id => {
  elements[id] = document.getElementById(id);
});

const digito1 = document.getElementById("n1");
const operador = document.getElementById("operador");
const digito2 = document.getElementById("n2");
const calculadora = document.querySelector("div.calculadora");
const res = document.getElementById("resultado");
const contenidoHistorial = [];

function operar(n1, simbolo, n2) {
  const operacionActual = [n1, simbolo, n2];
  contenidoHistorial.push(operacionActual);
  storehistorialInLocalStorage(operacionActual);

  let resultado;
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

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
  res.textContent = resultado;
  res.removeAttribute("id");
  res.classList.add("continue");
  // Guardar el resultado para el próximo cálculo continuo
  digito1.textContent = resultado;
  operador.textContent = "";
  digito2.textContent = "";
}

let parenthesesCounter = 0;
calculadora.addEventListener('click', (e) => {
  if (res.classList.contains("continue") && e.target.id !== "=" && e.target.id !== "c" && !["+", "-", "*", "/"].includes(e.target.id)) {
    digito1.textContent = res.textContent;
    operador.textContent = "";
    digito2.textContent = "";
    res.textContent = "";
    res.id = "resultado";
    res.classList.remove("continue");
  }

  const o = {
    n1: digito1.textContent,
    operador: operador.textContent,
    n2: digito2.textContent
  };

  switch (e.target.id) {
    case "c":
      res.textContent = "";
      digito1.textContent = "";
      operador.textContent = "";
      digito2.textContent = "";
      break;
    case "=":
      if (o.n1 && o.operador && o.n2) {
        operar(o.n1, o.operador, o.n2);
        // Mostrar solamente el resultado en el campo de resultado
        operador.textContent = "";
        digito2.textContent = "";
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (res.classList.contains("continue")) {
        operador.textContent = e.target.id;
        res.classList.remove("continue");
      } else if (digito2.textContent !== "") {
        operar(o.n1, o.operador, o.n2);
        operador.textContent = e.target.id;
        digito2.textContent = "";
        res.textContent = "";
      } else {
        operador.textContent = e.target.id;
      }
      break;
    case "+/-":
      if (operador.textContent === "") {
        digito1.textContent = parseFloat(digito1.textContent) * -1;
      } else {
        digito2.textContent = parseFloat(digito2.textContent) * -1;
      }
      break;
    case "history":
      toggleHistory();
      break;
    case "( )":
      if (operador.textContent !== "" && parenthesesCounter === 0) {
        digito2.append("(");
        parenthesesCounter = 1;
      } else if (operador.textContent !== "" && parenthesesCounter === 1) {
        digito2.append(")");
        parenthesesCounter = 0;
      } else if (operador.textContent === "" && parenthesesCounter === 0) {
        digito1.append("(");
        parenthesesCounter = 1;
      } else {
        digito1.append(")");
        parenthesesCounter = 0;
      }
      break;
    case "%":
      if (operador.textContent === "") {
        digito1.textContent = (parseFloat(digito1.textContent) / 100).toString();
      } else {
        digito2.textContent = (parseFloat(digito2.textContent) / 100).toString();
      }
      break;
    case ".":
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
        if (res.classList.contains("continue")) {
          digito1.textContent = e.target.id;
          res.classList.remove("continue");
        } else {
          digito1.append(e.target.id);
        }
      } else {
        digito2.append(e.target.id);
      }
      break;
  }
});

let historyToggleCount = 0;
let historySection;
function toggleHistory() {
  const historyContainer = document.querySelector("#history-section");

  if (historyContainer) {
    if (historyToggleCount === 0) {
      historySection = document.createElement("section");
      historyContainer.appendChild(historySection);
      historySection.classList.add("historial");
      historySection.textContent = "Historial de Operaciones:\n";

      const storedOperations = JSON.parse(localStorage.getItem("ope") || "[]");
      storedOperations.forEach(op => {
        const operationElement = document.createElement("p");
        operationElement.textContent = `${op[0]} ${op[1]} ${op[2]}`;
        historySection.appendChild(operationElement);
      });
      
      historyToggleCount = 1;
    } else if (historyToggleCount === 1) {
      historySection.style.display = "none";
      historyToggleCount = 2;
    } else if (historyToggleCount === 2) {
      historySection.style.display = "block";
      historyToggleCount = 1;
    }
  }
}

function storehistorialInLocalStorage(operacionActual) {
  const storedOperations = JSON.parse(localStorage.getItem("ope") || "[]");
  storedOperations.push(operacionActual);
  localStorage.setItem("ope", JSON.stringify(storedOperations));
}

// Intente de varias maneras pulir mas el codigo con chatGPT, pero veo que no sera posible sin mi asistencia. 