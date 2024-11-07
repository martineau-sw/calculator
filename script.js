function add(x, y) {
  return +x + +y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === '0') {
    return 'nooo';
  }
  return x / y;
}

let decimal = false;

function enterDigit(number) {
  if (entry.length === 15) return;

  if (number === '.') {
    if (!decimal) {
      if (entry.length === 0) {
        entry += '0.';
      } else {
        entry += '.';
      }
      decimal = true;
      updateDisplay(entry);
      return;
    }
    return;
  }

  if (stored && operator === '') {
    stored = '';
  }

  if (entry === '0') {
    entry = number;
  } else {
    entry += number;
  }
  updateDisplay(entry);
}

function removeDigit() {
  if (entry.length === 0) {
    updateDisplay('');
    return;
  };
  if (entry.at(-1) === '.') {
    decimal = false;
  }
  entry = entry.slice(0, -1);
  updateDisplay(entry);
}

function enterOperator(symbol) {
  if (entry.length > 0) {
    if(stored !== '') {
      stored = operate();
      updateDisplay(stored);
    } else {
      stored = entry;
    }
  }
  entry = '';
  decimal = false;
  operator = symbol;
}

function enterEqual() {
  if (entry.length > 0) {
    if (stored !== '' && operator !== '') {
      console.log('=');

      const result = operate();
      stored = result;
      entry = '';
      operator = '';
      updateDisplay(result);
    }
  }
}

function clear() {
  stored = '';
  entry = '';
  operator = '';
  decimal = false;
  updateDisplay('');
}

function updateDisplay(number) {
  let digits = number.toString();

  if (digits.length > 15) {
    const decimalIndex = digits.indexOf('.');
    if (decimalIndex < 0) digits = number.toExponential(4).toString();
    else if (decimalIndex > 0 && decimalIndex < 15) {
      digits = number.toFixed(14 - decimalIndex);
    }
  }

  const display = document.querySelector('#display');
  display.textContent = digits;
}

let stored = '';
let entry = '';
let operator = '';

function operate() {
  switch (operator) {
    case '+': return add(stored, entry);
    case '-': return subtract(stored, entry); 
    case '×': return multiply(stored, entry); 
    case '÷': return divide(stored, entry);
  }
}

function applyEventHandlers() {
  const numpad = document.querySelector('#numpad');

  buttons.addEventListener('click', event => {
    parseActionFromId(event.target.id);
  });

  document.addEventListener('keydown', event => {
    const button = document.querySelector(`#${eventKeyToId(event)}`);
    if (button == undefined) return;
    button.classList.add('pressed');
    parseActionFromId(button.id);
  });

  document.addEventListener('keyup', event => {
    const button = document.querySelector(`#${eventKeyToId(event)}`);
    if (button == undefined) return;
    button.classList.remove('pressed');
  });
}

function eventKeyToId(event) {
  switch (event.key) {
    case '1': return 'one';
    case '2': return 'two';
    case '3': return 'three';
    case '4': return 'four';
    case '5': return 'five';
    case '6': return 'six';
    case '7': return 'seven';
    case '8': return 'eight';
    case '9': return 'nine';
    case '0': return 'zero';
    case '.': return 'period';
    case 'Enter':
    case '=': return 'equals';
    case 'Backspace': 
      if (event.shiftKey) return 'clear';
      return 'back';
    case '+': return 'add';
    case '-': return 'subtract';
    case '*': return 'multiply';
    case '/': return 'divide';
  }
}

function parseActionFromId(id) {
  const selected = document.querySelector(`#${id}`);
  switch (id) {
    case 'one':
    case 'two':
    case 'three':
    case 'four':
    case 'five':
    case 'six':
    case 'seven':
    case 'eight':
    case 'nine':
    case 'zero':
    case 'period':
      enterDigit(selected.textContent);
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      enterOperator(selected.textContent);
      break;
    case 'equals':
      enterEqual();
      break;
    case 'back':
      removeDigit();
      break;
    case 'clear':
      clear();
      break;
  }
}

applyEventHandlers();