function customEval(expression) {
    let operands = [];
    let operators = [];
    let lastTokenWasOperator = true;
    let lastTokenWasOperand = false;
    let i = 0;

    function evaluateOperation(operator) {
        let operand2 = operands.pop();
        let operand1 = operands.pop();
        switch (operator) {
            case "+":
                operands.push(operand1 + operand2);
                break;
            case "-":
                operands.push(operand1 - operand2);
                break;
            case "*":
                operands.push(operand1 * operand2);
                break;
            case "/":
                if (operand2 === 0) {
                    throw new Error("Division by zero");
                }
                operands.push(operand1 / operand2);
                break;
            case "%":
                if (operand2 === 0) {
                    throw new Error("Modulo by zero");
                }
                operands.push(operand1 % operand2);
                break;
            default:
                throw new Error("Unknown operator: " + operator);
        }
    }

    while (i < expression.length) {
        let token = expression[i];
        if (token === " ") {
            i++;
            continue;
        }
        if (/[\d\.]/.test(token)) {
            let number = token;
            while (/[\d\.]/.test(expression[i + 1])) {
                i++;
                number += expression[i];
            }
            operands.push(parseFloat(number));
            if (operators.length > 0 && operators[operators.length - 1] === "*") {
                evaluateOperation(operators.pop());
            }
            lastTokenWasOperator = false;
            lastTokenWasOperand = true;
        }

        if (/[\+\-\*\/\%\^]/.test(token)) {
            if (lastTokenWasOperator || (!lastTokenWasOperand && token === "-")) {
                operands.push(-1);
                operators.push("*");
            } else {
                while (
                    operators.length > 0 &&
                    /[^\(]/.test(operators[operators.length - 1]) &&
                    ((/[\^]/.test(token) && /[\^]/.test(operators[operators.length - 1])) ||
                        (/[\/\*\%]/.test(token) && /[\/\*\%]/.test(operators[operators.length - 1])) ||
                        (/[+\-]/.test(token) && /[\+\-]/.test(operators[operators.length - 1])))
                ) {
                    evaluateOperation(operators.pop());
                }
                operators.push(token);
                lastTokenWasOperator = true;
                lastTokenWasOperand = false;
            }
        }

        if (token === "(") {
            operators.push(token);
            lastTokenWasOperator = true;
            lastTokenWasOperand = false;
        }

        if (token === ")") {
            while (operators.length > 0 && operators[operators.length - 1] !== "(") {
                evaluateOperation(operators.pop());
            }
            if (operators.length === 0) {
                throw new Error("Mismatched parentheses");
            }
            operators.pop();
            lastTokenWasOperator = false;
            lastTokenWasOperand = true;
        }

        i++; // On passe au caractère suivant dans l'expression
    }

    // Évaluation des opérations restantes dans les piles
    while (operators.length > 0) {
        if (operators[operators.length - 1] === "(") {
            throw new Error("Mismatched parentheses");
        }
        evaluateOperation(operators.pop());
    }
    if (operands.length !== 1) {
        throw new Error("Invalid syntax: too many operands");
    }
    return operands.pop();
}
module.exports = { customEval }