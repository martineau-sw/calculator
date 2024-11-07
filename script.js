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
  if (entry.length === 9) return;

  if (number === '.') {
    if (!decimal) {
      if (entry.length === 0) {
        entry += '0.';
      } else {
        entry += '.';
      }
      decimal = true;
      console.log(entry);
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
  console.log(entry);
  updateDisplay(entry);
}

function removeDigit() {
  if (entry.length === 0) return;
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

  if (digits.length > 9) {
    const decimalIndex = digits.indexOf('.');
    if (decimalIndex < 0) digits = number.toExponential(4).toString();
    else if (decimalIndex > 0 && decimalIndex < 9) {
      digits = number.toFixed(8 - decimalIndex);
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
    case '*': return multiply(stored, entry); 
    case '/': return divide(stored, entry);
  }
}

function applyEventHandlers() {
  const numpad = document.querySelector('#numpad');

  buttons.addEventListener('click', event => {
    switch (event.target.id) {
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
        enterDigit(event.target.textContent);
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        enterOperator(event.target.textContent);
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
  });
}

applyEventHandlers();