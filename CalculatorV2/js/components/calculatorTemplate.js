Template.prototype.calculatorTemplate = () => `
        <div class="header">
            <h1>Калькулятор</h1>
        </div>
        <div class="getValueInputs">
            <textarea class="input" placeholder="0" id="areaA"></textarea>
            <textarea class="input" placeholder="0" id="areaB"></textarea>
        </div>

        <div class="results">
            <p>Результат:</p>
            <textarea  class="resultNumber" id="areaC" disabled>-</textarea>
        </div>
    <div class="operandsContainer">
        <button class="operands btn operand" data-operand="add"> + </button>
        <button class="operands btn operand" data-operand="sub"> - </button>
        <button class="operands btn operand" data-operand="mult"> * </button>
        <button class="operands btn operand" data-operand="div"> / </button>
        <button class="operands btn operand" data-operand="prod">prod</button>
        <button class="operands btn operand" data-operand="zero"> 0 </button>
        <button class="operands btn operand" data-operand="one"> 1 </button>
        <button class="operands btn operand" data-operand="pow"> ^ </button>
    </div>
    <textarea class="info" disabled>
        матрица: 
        2, 3
        5, 6
        комплексное число: 2+2i
        вектор: (1 2)
        цифра: 2
        многочлены: 5x^2 - 6x + 24
        Ирхин Илья ИВТ
        v0.9
    </textarea>
`;