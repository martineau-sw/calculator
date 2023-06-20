const buttonEvents = () => {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const functionButtons = document.querySelectorAll('.function');

    document.body.addEventListener('keydown', (event) => {
        if(!event.shiftKey) {
            if(event.code.includes('Digit') || event.code.includes('Numpad')) {
                pushButton(event.code.slice(-1));
                typeValue(event.code.slice(-1));
                return;
            }  

            if(event.code == 'Period' || event.code == 'NumpadDecimal') {
                pushButton('.');
                typeValue('.');
            }

            if(event.code == 'Slash' || event.code == 'NumpadDivide') {
                pushButton('÷');
                operate('÷');
            }

            if(event.code == 'Minus' || event.code == 'NumpadSubtract') {
                pushButton('-');
                operate('-');
                return;
            }

            if(event.code == 'NumpadMultiply') {
                pushButton('×');
                operate('×');
                return;
            }

            if(event.code == 'NumpadAdd') {
                pushButton('+');
                operate('+');
                return;
            }

            if(event.code == 'Backspace') {
                pushButton('⌫');
                backspaceDisplay();
                return;
            }

            if(event.code == 'Enter' || event.code == '=') {
                pushButton('=');
                operate('=');
            }

            return;
        } 

        if (event.shiftKey) {
            if(event.code == 'Digit8') {
                pushButton('×');
                operate('×');
                return;
            }

            if(event.code == 'Equal') {
                pushButton('+');
                operate('+');
                return;
            }

            if(event.code == 'Backspace') {
                pushButton('AC');
                valueBuffer = 0;
                operationBuffer = 0;
                setValueOnDisplay('');
                return;
            }
        }
    });

    document.body.addEventListener('keyup', (event) => {
        if(!event.shiftKey) {
            if(event.code.includes('Digit') || event.code.includes('Numpad')) {
                releaseButton(event.code.slice(-1));
                return;
            }  

            if(event.code == 'Slash') {
                releaseButton('÷');
                return
            }

            if(event.code == 'Minus') {
                releaseButton('-');
                return;
            }

            if(event.code == 'Backspace') {
                releaseButton('⌫');
                return;
            }

            if(event.code == 'Enter' || event.code == '=') {
                releaseButton('=');
                return;
            }
        } 

        if (event.shiftKey) {
            if(event.code == 'Digit8') {
                releaseButton('×');
                return;
            }

            if(event.code == 'Equal') {
                releaseButton('+');
                return;
            }

            if(event.code == 'Backspace') {
                releaseButton('AC');
                return;
            }

            
        }
    });

    numberButtons.forEach((button) => {
        button.addEventListener('mousedown', (event) => { 
            pushButton(event.target);
            typeValue(event.target.textContent);
        });

        button.addEventListener('mouseup', (event) => { 
            releaseButton(event.target);
        });
    })

    operatorButtons.forEach((button) => {
        button.addEventListener('mousedown', (event) => {
            pushButton(event.target);
            operate(button.textContent);
            newValue = true;
        })

        button.addEventListener('mouseup', (event) => {
            releaseButton(event.target);
        })
    })

    functionButtons.forEach((button) => {
        if(button.textContent == '⌫') {

            button.addEventListener('mousedown', (event) => {
                pushButton(event.target);
                backspaceDisplay();
            });

            button.addEventListener('mouseup', (event) => {
                releaseButton(event.target);
            });
        } 
        else {
            button.addEventListener('mousedown', (event) => {
                pushButton(event.target);
                valueBuffer = 0;
                operationBuffer = 0;
                setValueOnDisplay("");
            });

            button.addEventListener('mouseup', (event) => {
                releaseButton(event.target);
            });
        }
    })
}

function typeValue(number) {
    if(newValue) {
        setValueOnDisplay("");
        newValue = false;
    }

    if(number == '.' && !getValueFromDisplay().toString().includes('.') || 
    number != '.') {
        appendValueToDisplay(number);
    }
}

function pushButton(button) {
    if(typeof(button) == typeof('')) {
        const selectAll = Array.from(document.querySelectorAll('.button'));
        button = selectAll.find(element => element.textContent == button);
    }

    button.classList.add('pressed');
}

function releaseButton(button) {
    if(typeof(button) == typeof('')) {
        const selectAll = Array.from(document.querySelectorAll('.button'));
        button = selectAll.find(element => element.textContent == button);
    }

    button.classList.remove('pressed');
}

function appendValueToDisplay(number) {
    const display = document.querySelector('.display');
    display.textContent += number;
}

function setValueOnDisplay(number) {
    const display = document.querySelector('.display');
    display.textContent = number;
}

function backspaceDisplay() {
    const display = document.querySelector('.display');
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function getValueFromDisplay() {
    const display = document.querySelector('.display');
    if(display.textContent.includes('.')) return parseFloat(display.textContent);
    return parseInt(display.textContent);
}

function operate(operator) {
    if(valueBuffer == undefined) return;

    newValue = true;

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