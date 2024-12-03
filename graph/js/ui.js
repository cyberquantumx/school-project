const {
    abs,
    acos,
    acosh,
    asin,
    asinh,
    atan,
    atan2,
    atanh,
    ceil,
    cos,
    cosh,
    exp,
    floor,
    log,
    max,
    min,
    pow,
    random,
    round,
    sin,
    sinh,
    sqrt,
    tan,
    tanh
} = Math;

function UI(options) {
    let callbacks = options.callbacks;

    var MQ = MathQuill.getInterface(2);

    //document.getElementById('showHide').addEventListener('click', showHide);
    document.getElementById('addFunction').addEventListener('click', addFunction);

    let num = 0;

    function showHide() {
        document.querySelector('.overlay').classList.toggle('hide');
    }

    function addFunction() {
        let containerFunc = document.createElement('div');
        containerFunc.className = "w-100 h-30 containerFunc p-2"

        let titleFunc = document.createElement('h6');
        titleFunc.innerText = 'Function ' + num;

        let inputFunc = document.createElement('P');
        inputFunc.setAttribute('placeholder', `Function № ${num+1}`);
        inputFunc.className = 'm-05 w-100p'
        inputFunc.dataset.num = num;
        var answerMathField = MQ.MathField(inputFunc, {
            handlers: {
                edit: function () {
                    try {
                        let enteredMath = answerMathField.latex();
                        enteredMath = enteredMath.replaceAll(`\\cdot`, '*').replaceAll(' ', '');
                        keyupAdd(enteredMath, inputFunc.dataset.num);
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        });
        inputFunc.id = `input${num}`;


        

        let inputColor = document.createElement('input');
        inputColor.className = 'm-05'
        inputColor.setAttribute('type', 'color')
        inputColor.value = '#745eff';
        inputColor.addEventListener('change', keyupColor);
        inputColor.dataset.num = num;

        let inputWidth = document.createElement('input');
        inputWidth.className = 'inputWidth m-05 w-70p';
        inputWidth.value = 2;
        inputWidth.setAttribute('placeholder', `Толщина`);
        inputWidth.setAttribute('type', 'number')
        inputWidth.addEventListener('keyup', keyupWidth);
        inputWidth.addEventListener('change', keyupWidth);
        inputWidth.dataset.num = num;

        let delButton = document.createElement('button');
        delButton.innerHTML = '<i class="fa-solid fa-close"></i>';
        delButton.className = 'delBtn font-bold m-05 h-5'
        delButton.addEventListener('click', () => {
            callbacks.delFunction(inputFunc.dataset.num);
            funcInputs.removeChild(containerFunc)
        })

        let funcInputs = document.getElementById('funcInputs');
        containerFunc.append(titleFunc)
        containerFunc.append(inputFunc);
        containerFunc.append(inputWidth);
        containerFunc.append(inputColor);
        containerFunc.append(delButton);
        funcInputs.append(containerFunc)
        num++;
    }

    let fastFns = [{
        'name': '√',
        'id': 'sqrt_btn',
        'valueLatex': '\\sqrt{}'
    },
    {
        'name': 'cos',
        'id': 'cos_btn',
        'valueLatex': '\cos'
    }]

    /*let fastFunctions = document.getElementById('fastFunctions');

    fastFns.map(f => {
        let b = document.createElement('button');
        b.id = f.id;
        b.innerText = f.name;
        b.addEventListener("click", () => {
            //MQ.cmd(f.valueLatex);
        })
        fastFunctions.append(b)
    })
    */
    function keyupAdd(f, num) {
        try {
            //this.value = 0;
            //eval("f = function(x) { return " + this.value + ";}")
            callbacks.addFunction(f, num, `Function №${num}`);

        } catch (err) {}
    }

    function keyupColor() {
        callbacks.setColor(this.value, this.dataset.num);
    }

    function keyupWidth() {
        callbacks.setWidth(this.value, this.dataset.num);
    }




}

export default UI;