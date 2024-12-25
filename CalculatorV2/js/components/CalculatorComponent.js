class CalculatorComponent extends Component {
    constructor(options) {
        super(options);
        this.calculator = new Calculator();
    }

    _addEventListeners() {
        let _a_ = false;
        let _b_ = false;

        const buttons = document.querySelectorAll('.operands');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.calculate(button.dataset.operand));
        });

        const textA = document.getElementById('areaA');
        const textB = document.getElementById('areaB');

        const checkExceptions = (result) => {
            const div = document.querySelector(`.operands[data-operand="div"]`);
            const prod = document.querySelector(`.operands[data-operand="prod"]`);
            const pow = document.querySelector(`.operands[data-operand="pow"]`);
            
            const add = document.querySelector(`.operands[data-operand="add"]`);
            const sub = document.querySelector(`.operands[data-operand="sub"]`);
            const mult = document.querySelector(`.operands[data-operand="mult"]`);
            if (_a_ && _b_) {
                if (result instanceof Complex) {
                    prod.classList.add('disabled');
                    prod.disabled = true;
                    pow.classList.add('disabled');
                    pow.disabled = true;
                } else {
                    div.disabled = true;
                    prod.disabled = true;
                    pow.disabled = true;
                    div.classList.add('disabled');
                    pow.classList.add('disabled');
                    prod.classList.add('disabled');
                }
            } else {
                if (result instanceof Complex) {
                    prod.classList.remove('disabled');
                    pow.classList.remove('disabled');
                    prod.disabled = false;
                    pow.disabled = false;
                }

                if (div.disabled) {
                    div.disabled = false;
                    prod.disabled = false;
                    pow.disabled = false;

                    div.classList.remove('disabled');
                    pow.classList.remove('disabled');
                    prod.classList.remove('disabled');
                }
            }
        };

        const handleInput = (textAreaId) => {
            const calculator = new Calculator();
            const textArea = document.getElementById(textAreaId);
            const result = calculator.toValue(textArea.value);

            if (result instanceof Matrix || result instanceof Polynomial || result instanceof Complex || result instanceof Vector) {
                textAreaId === "areaA" ? _a_ = true : _b_ = true;
            } else {
                textAreaId === "areaA" ? _a_ = false : _b_ = false;
            }
            
            checkExceptions(result);
        };

        textA.addEventListener('input', () => handleInput('areaA'));
        textB.addEventListener('input', () => handleInput('areaB'));

        const updateButtonStates = () => {
            handleInput('areaA');
            handleInput('areaB');
        };

        textA.addEventListener('input', updateButtonStates);
        textB.addEventListener('input', updateButtonStates);
    }

    calculate(operand) {
        const textA = document.getElementById('areaA');
        const textB = document.getElementById('areaB');
        const textC = document.getElementById('areaC');

        let a = this.calculator.toValue(textA.value);
        let b = this.calculator.toValue(textB.value);
        console.log(a, b);

        if (a && b) {
            let c;
            if (operand === 'zero' || operand === 'one') {
                c = this.calculator[operand](null, a);
            } else {
                c = this.calculator[operand](a, b);
            }

            if (c != null) {
                console.log('Результат вычисления:', c);
                textC.value = c.toString();
            } else {
                console.error('Вычисление вернуло null');
                textC.value = 'Ошибка: Вычисление вернуло null';
            }
        } else {
            console.error('Неверные входные данные:', a, b);
            textC.value = 'Ошибка: Неверные входные данные';
        }
    }
}
