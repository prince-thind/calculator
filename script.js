const numberDivs = document.querySelectorAll("[data-number]");
const operationDivs = document.querySelectorAll("[data-operation]");
const enterDiv = document.querySelector("[data-equals]");
const deleteDiv = document.querySelector("[data-delete]");
const ACbutton = document.querySelector("[data-all-clear]");
const upperField = document.querySelector("[data-previous-operand]");
const currentField = document.querySelector("[data-current-operand]");

let displayNumber = "";
let oldNumber = 0;
let operator = null;


numberDivs.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    display();
  });
});

operationDivs.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    display();
  });
});

enterDiv.addEventListener("click", () => {
  compute();
  display();
});

ACbutton.addEventListener("click", () => {
  reset();
  display();
});

deleteDiv.addEventListener("click", () => {
  backspace();
  display();
});




function display() {
  currentField.textContent = displayNumber;
  if (operator) {
    upperField.textContent = oldNumber + " " + operator;
  } else {
    upperField.textContent = "";
  }
}

function reset() {
  displayNumber = "";
  oldNumber = 0;
  operator = null;
  
}

function backspace() {
  displayNumber = displayNumber.toString().slice(0, -1);
  
}

function appendNumber(number) {
  if (number === "." && displayNumber.includes(".")) return;
  displayNumber = displayNumber.toString() + number.toString();
}

function chooseOperation(op) {
  if (displayNumber === "") return;
  if (oldNumber !== "") {
    compute();
  }
  operator = op;
  oldNumber = displayNumber;
  displayNumber = "";
}

function compute() {
  let computation;
  const prev = parseFloat(oldNumber);
  const current = parseFloat(displayNumber);

  if (isNaN(prev) || isNaN(current)) return;


  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }
  displayNumber = computation;
  operator = undefined;
  oldNumber = "";
}