const previousOperandElement = document.querySelector('.previousDisplay');
const currentOperandElement = document.querySelector('.currentDisplay');
const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operations]');
const equalBtn = document.querySelector('[data-equals]');
console.log(equalBtn);
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;

    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        if (this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }
    compute() {
        console.log('Inside Compute ');
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = (prev + curr).toFixed(3);
                break;
            case '-':
                computation = prev - curr;
                break;
            case 'x':
                computation = (prev * curr).toFixed(3);
                break;
            case '÷':
                computation = (prev / curr).toFixed(3);
                break;
            case '%':
                computation = ((prev / 100) * curr).toFixed(3);
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''

    }
    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}


const calculator = new Calculator(previousOperandElement, currentOperandElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})
operationButtons.forEach((button) => {
    button.addEventListener('click', (button) => {
        calculator.chooseOperation(button.target.innerText);
        calculator.updateDisplay()
    })
})
equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})
allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
})


