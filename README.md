# Project: Calculator

## Description

A calculator page that displays the most recent entry/result that can add, subtract, divide, and multiply, with a backspace and clear button.

## Steps

- [x] Math functions
	- [x] add
	- [x] subtract
	- [x] multiply
	- [x] divide
- [x] Operator variable
- [x] Operand variables
- [x] Operate function, accepts operator and operands and calls respective math function
- [x] HTML calculator interface with operator, numbers, equal and clear buttons
- [x] Link

## Problem Solving

### Understand

A calculator HTML page that stores user inputs and evaluates the operation. Displays most recent number input, a result or operand with max number of digits.

### Plan

#### User Interface

Calculator with buttons and number display

#### Input

- 0-9 buttons
- +, \*, /, - buttons
- = button
- Clear button

#### Output

- Number display of operand entry or result of operation with max digits

#### Input to Output

On click events for each of the buttons. 

Number buttons append digits to operand until an operator is selected. If an operator is selected with two operands, evaluate the result and store in first operand. Allow for input in next operand.

Clear button clears both operand variables and operator variable.

#### Pseudocode

```pseudocode
FUNCTION add(x, y) returns number
	Return x + y
ENDFUNCTION

FUNCTION multiply(x, y) returns number
	Return x * y
ENDFUNCTION

FUNCTION subtract(x, y) returns number
	Return x - y
ENDFUNCTION

FUNCTION divide(x, y) returns number
	IF y is equal to zero THEN
		display "no"
	ENDIF
	return x / y
ENDFUNCTION

FUNCTION display(number) 
	display = select display element
	digits = number to string
	IF length of digits > 9 THEN
		index = index of '.'
		IF index >= 0 and index < 9 THEN
			digits = number fixed(9 - index)
 		ELSE 
	 		Return
	 	ENDIF
	ENDIF
	Set display content to digits
ENDFUNCTION

FUNCTION enterDigit(digit)
	IF entry length == 9 THEN return
	entry += digit
	display(entry)
ENDFUNCTION

FUNCTION enterOperator(symbol) 
	IF entry length == 0 THEN 
		operator = symbol
	ELSE
		operate() 
		operator = symbol

FUNCTION operate() 
	entry = entry as number
	CASE operator OF
		+: result = add(stored, entry)
		-: result = subtract(stored, entry)
		*: result = multiply(stored, entry)
		/: result = divide(stored, entry)
	ENDCASE
	stored = result as number
	operator = none
	entry = ""
	display(result)
ENDFUNCTION

```