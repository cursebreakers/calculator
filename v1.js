//JS Calc Engine v0.1


document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const keys = document.getElementById('keys');
    let currentExpression = '';
     
    keys.addEventListener('click', function (event) {
      const { target } = event;
      const key = target.textContent;
      
      if (key === 'Clear') {
        currentExpression = '';
        updateDisplay('');
      } else if (key === '=' && currentExpression !== '') {
        try {
          currentExpression = evaluateExpression(currentExpression);
          updateDisplay(currentExpression);
        } catch (error) {
          currentExpression = '';
          updateDisplay('Error');
        }
      } else {
        currentExpression += key;
        updateDisplay(currentExpression);
      }
    });
   
    function updateDisplay(value) {
      display.textContent = value;
    }
   
    function evaluateExpression(expression) {
        const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  // Helper function to apply an operator on two operands
  function applyOperator(operands, operator) {
    const b = operands.pop();
    const a = operands.pop();
    operands.push(operators[operator](a, b));
  }

  const operandStack = [];
  const operatorStack = [];
  let numberBuffer = '';

  for (const char of expression) {
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

  return operandStack[0];
}
});
