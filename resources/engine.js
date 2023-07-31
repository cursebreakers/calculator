// JS Calc Engine v1.1


// Operations consist of number, operator and another number
// (eg: 3 + 5) Three variables: vrblOne, vrblTwo and operator

let vrblOne = '';
let vrblTwo = '';
let operator = '';
let currentInput = '';

// Display update function
function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = `${vrblOne} ${operator} ${currentInput}`;
}

function clearData() {
    vrblOne = '';
    operator = '';
    vrblTwo = '';
    currentInput = '';
}

// Basic functions: Add
function add(a, b) {
    return a + b;
}
// Subtract
function subtract(a, b) {
    return a - b;
}
// Multiply
function multiply(a, b) {
    return a * b;
}
// Divide
function divide(a, b) {
    if (b === 0) {
        return 'Dividing by zero eh? No can do!';
    }
    return a / b;
}

// Long decimal rounding
function roundResult(result) {
    return Math.round((result + Number.EPSILON) * 100) / 100;
}

// Handle button clicks
function handleClicks(event) {
  const btnTxt = event.target.textContent;
  
  if (!isNaN(btnTxt) || btnTxt === '.') {
    if (btnTxt === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += btnTxt;
}

  // Handle Operator buttons
  else if (['+', '-', '*', '/'].includes(btnTxt)) {
    if (operator !== '') {
        // Evaluates first pair of numbers if operator is already set
        vrblTwo = parseFloat(currentInput);
        vrblOne = operate(vrblOne, operator, vrblTwo);
        operator = btnTxt;
        currentInput = '';
      } else {
        vrblOne = parseFloat(currentInput);
        operator = btnTxt;
        currentInput = '';        
      }
    }

    // Clear button
    else if (btnTxt === 'C') {
        clearData();
    }

    // Equals button
    else if (btnTxt === '=') {
        if (operator && currentInput) {
        vrblTwo = parseFloat(currentInput);
        vrblOne = operate(vrblOne, operator, vrblTwo);
        operator = '';
        currentInput = String(roundResult(vrblOne));
        // Clear vrblOne before displaying the result
        vrblOne = '';
        updateDisplay();
    }
}

    // Backspace
    else if (btnTxt === '←') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '';
        }
    }

  updateDisplay();
}

// Operate function calls basic functions
function operate(a, operator, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return b;
    }
}

// Button event listeners
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', handleClicks);
});

// Keyboard Functionality
document.addEventListener('keydown', handleKeyboardPress);

// Handles keyboard press
function handleKeyboardPress(event) {
    const key = event.key.toLowerCase();

    // Define the key mappings for numbers, operators, and other keys
    const keyMappings = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '+': '+',
      '-': '-',
      '*': '*',
      '/': '/',
      '.': '.',
      'enter': '=',
      '=': '=',
      'backspace': '←',
      'delete': 'c',
  };

  // Get the corresponding button text from the key mappings
  const buttonText = keyMappings[key];

  // If the key is mapped to a button, simulate a click event on that button
  if (buttonText !== undefined) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === buttonText) {
            button.click();
        }
    });
  }
}    
// Initialize Display
updateDisplay();