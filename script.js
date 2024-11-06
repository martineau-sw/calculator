function add(x, y) {
  console.log(+x + +y);
  return +x + +y;
}

function subtract(x, y) {
  console.log(x - y);
  return x - y;
}

function multiply(x, y) {
  console.log(x * y);
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    console.log('nooo');
    return 'nooo';
  }
  console.log(x / y);
  return x / y;
}