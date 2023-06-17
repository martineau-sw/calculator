const buttonEvents = () => {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');

    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(newValue) {
                setValueOnDisplay("");
                newValue = false;
            }

            if(button.textContent == '.' && !getValueFromDisplay().toString().includes('.') || 
                button.textContent != '.') {

                appendValueToDisplay(button.textContent);
            }
        })
    })

    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            operate(button.textContent);
            newValue = true;
        })
    })
}

const numberButtons = () => {

}

const operatorButtons = () => {

}

const calculator = () => {

}

const display = () => {
    
}

function appendValueToDisplay(number) {
    const display = document.querySelector('.display');
    display.textContent += number;
}

function setValueOnDisplay(number) {
    const display = document.querySelector('.display');
    display.textContent = number;
}

function getValueFromDisplay() {
    const display = document.querySelector('.display');
    if(display.textContent.includes('.')) return parseFloat(display.textContent);
    return parseInt(display.textContent);
}

function operate(operator) {
    if(valueBuffer == undefined) return;

    switch(operationBuffer) {
        case '+':
            setValueOnDisplay(valueBuffer + getValueFromDisplay());
            break;
        case '-':
            setValueOnDisplay(valueBuffer - getValueFromDisplay());
            break;
        case '×':
            setValueOnDisplay(valueBuffer * getValueFromDisplay());
            break;
        case '÷':
            setValueOnDisplay(valueBuffer / getValueFromDisplay());
            break;
        case '=':
            operationBuffer = '';
            break;

        default:
            break;
    }
    operationBuffer = operator;
    valueBuffer = getValueFromDisplay();

}

let operationBuffer;
let valueBuffer = 0;
let newValue = true;

buttonEvents();