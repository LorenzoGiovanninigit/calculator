// basic functions
function add (x, y) {
    return x + y;
}
function subtract (x, y) {
    return x - y;
}
function multiply (x, y) {
    return x * y;
}
function divide (x, y) {
    return x / y;
}

function operate (operator, x, y) {
    switch (operator) {
        case "+":
            return x + y;
        case "−":
            return x - y;
        case "×":
            return x * y;
        case "÷":
            return x / y;
        default:
            break;
    }
}
// variables and selectors
const numbers = document.querySelectorAll("[data-number]");
const operand = document.querySelectorAll("[data-operand]");
const allClear = document.querySelector("[data-all-clear]");
const clear = document.querySelector("[data-clear]");
const equals = document.querySelector("[data-equals]");
const currentOperand = document.querySelector(".calc__current");
const previousOperand = document.querySelector(".calc__previous");
const decimal = document.querySelector(".decimal");

let firstValue;
let secondValue;
let operatorType = "";
let result;


numbers.forEach(btn => {
    btn.addEventListener("click", e => {
        if (currentOperand.textContent == 0) {
            currentOperand.textContent = btn.textContent; 
        } else if (previousOperand.textContent.includes("=")) {
            previousOperand.textContent = "";
            currentOperand.textContent = btn.textContent;
        } else {
            currentOperand.textContent += btn.textContent;
        }
    })
})

operand.forEach(btn => {
    btn.addEventListener("click", e => {
        if (operatorType == "") {
            firstValue = currentOperand.textContent;
            operatorType = btn.textContent;
            previousOperand.textContent = `${firstValue} ${operatorType}`
            currentOperand.textContent = 0;
            decimal.disabled = false;
        } else {
            secondValue = currentOperand.textContent;
            result = operate(operatorType, parseFloat(firstValue), parseFloat(secondValue))
            currentOperand.textContent = result;
            previousOperand.textContent = `${firstValue} ${operatorType} ${secondValue} =`
            firstValue = result;
            operatorType = btn.textContent;
            decimal.disabled = false;
        }
    })
})

clear.addEventListener("click", e => {
    if (currentOperand.textContent.length == "1") {
        currentOperand.textContent = "0";
    } else {
        currentOperand.textContent = currentOperand.textContent.split("").slice(0, -1).join("")
    }
})

allClear.addEventListener("click", e => {
    firstValue;
    secondValue;
    operatorType = "";
    currentOperand.textContent = "0";
    previousOperand.textContent = "";
})

equals.addEventListener("click", e => {
    secondValue = currentOperand.textContent;
    if (!secondValue || secondValue == "0") {
        return;
    }
    result = operate(operatorType, parseFloat(firstValue), parseFloat(secondValue))
    if (Number.isInteger(result)) {
        currentOperand.textContent = result;
    } else {
        currentOperand.textContent = result.toPrecision(3);
    }
    previousOperand.textContent = `${firstValue} ${operatorType} ${secondValue} =`
    firstValue;
    secondValue;
    operatorType = "";
    decimal.disabled = false;
})

decimal.addEventListener("click", e => {
    decimal.disabled = true;
})