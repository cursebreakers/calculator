// JS Calc Engine v1.1

// Establish event listeners for both UI keys & keyboard/numpad operators, etc
// Prevent errors using forward slashes
// Include a decimal functionality that rounds long decimals,
// So reuslts do not overflow display
// Include "backspace" button
// Provide snippy/sarcastic response if user tries to divide by zero


//JS Calc Engine v1.1

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const keys = document.getElementById('keys');
    let currentExpression = '';
    let evaluated = false;

    // Event listeners for UI keys
    keys.addEventListener('click', handleButtonClick);

    // Event listener for keyboard input
    document.addEventListener('keydown', handleKeyboardInput);

    function handleButtonClick(event) {
      const { target } = event;
      const key = target.textContent;
      processInput(key);
    }

    function handleKeyboardInput(event) {
      const key = event.key;
      // Prevent errors using forward slashes
      if (key === '/') {
        event.preventDefault();
        processInput('/');
      } else if (key === 'Enter') {
        // Map Enter key to the '=' symbol
        event.preventDefault();
        processInput('=');
      } else if (key === 'Backspace') {
        // Map Backspace key to the 'Back' button
        event.preventDefault();
        processInput('Back');
      } else if (/^[0-9+\-*/.\n]$/.test(key)) {
        // Allow only certain keys (0-9, +, -, *, /, ., Enter, and Backspace)
        event.preventDefault();
        processInput(key);
      }
    }

    function processInput(input) {
      if (input === 'Clear') {
        currentExpression = '';
        updateDisplay('');
        evaluated = false;
      } else if (input === '=') {
        evaluateExpression();
      } else if (input === 'Back') {
        // Implement "backspace" functionality
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay(currentExpression);
      } else {
        if (evaluated) {
        // Start a new expression after evaluation    
          currentExpression = input;
          evaluated = false;
        } else {
        // Simplify expression as new operators are added
          if (input.match(/[+\-*/]/)) {
        evaluatePartialExpression();
          }
          currentExpression += input;
        }
        updateDisplay(currentExpression);
      }
    }

    function updateDisplay(value) {
      display.textContent = value;
    }

    function evaluateExpression() {
        evaluatePartialExpression();
        evaluated = true;
    }

    function evaluatePartialExpression() {
      const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
          if (b === 0) {
            currentExpression = '';
            updateDisplay("Nice try, you can't divide by zero!");
            return;
          }
          return a / b;
        },
      };

      const operandStack = [];
      const operatorStack = [];
      let numberBuffer = '';

      for (const char of currentExpression) {
        if (!isNaN(char) || char === '.') {
          numberBuffer += char;
        } else {
          if (numberBuffer !== '') {
            operandStack.push(parseFloat(numberBuffer));
            numberBuffer = '';
          }
          if (char in operators) {
            while (
              operatorStack.length > 0 &&
              operators[operatorStack[operatorStack.length - 1]] >= operators[char]
            ) {
              applyOperator(operandStack, operatorStack.pop());
            }
            operatorStack.push(char);
          }
        }
      }

      if (numberBuffer !== '') {
        operandStack.push(parseFloat(numberBuffer));
      }

      while (operatorStack.length > 0) {
        applyOperator(operandStack, operatorStack.pop());
      }
      // Decimal functionality to round long decimals
      const result = operandStack[0];
      if (result % 1 !== 0) {
        currentExpression = result.toFixed(2); // You can adjust the number of decimal places as needed
      } else {
        currentExpression = result.toString();
      }
    }

    // Helper function to apply an operator on two operands
    function applyOperator(operands, operator) {
      const b = operands.pop();
      const a = operands.pop();
      operands.push(operators[operator](a, b));
    }
});