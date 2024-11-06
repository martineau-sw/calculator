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
  if (y === 0) {
    return 'nooo';
  }
  return x / y;
}

function enterDigit(number) {
  if (entry.length == 9) return;
  if (stored && operator === '') {
    stored = undefined;
  }
  entry += number;
  updateDisplay(entry);
}

function enterOperator(symbol) {
  console.log(symbol);
  if (entry.length > 0) {
    if(stored) {
      const result = operate();
      stored = result;
      updateDisplay(result);
    } else {
      stored = +entry;
      entry = '';
    }
  }
  operator = symbol;
}

function enterEqual() {
  console.log('=');
  if (entry.length > 0) {
    if (stored && operator) {
      const result = operate();
      stored = result;
      entry = '';
      operator = '';
      updateDisplay(result);
    }
  }
}

function clear() {
  stored = undefined;
  entry = '';
  operator = '';
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

  console.log(digits)
  // const display = document.querySelector('#display');
  // display.textContent = digits;
}

let stored;
let entry = '';
let operator = '';

function operate() {
  let result;
  switch (operator) {
    case '+': return add(stored, entry);
    case '-': return subtract(stored, entry); 
    case '*': return  multiply(stored, entry); 
    case '/': return divide(stored, entry);
  }

  return result;
}