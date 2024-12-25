class Polynomial {
    constructor(poly = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(a) {
        const calc = new Calculator();
        return this.poly.reduce((s, elem) =>
            calc.add(
                s,
                calc.prod(calc.pow(a, elem.power), elem.value)
            ),
            calc.zero(null, a)
        );
    }

    toStr(k) {
        return this.poly.map((el) => {
            if (el.power === 0) {
                return el[k](); // Константа, без 'x^0'
            } else if (el.power === 1) {
                return `${el.value === 1 ? '' : el.value}x`; // Убираем '1x'
            } else {
                return `${el.value === 1 ? '' : el.value}x^${el.power}`;
            }
        }).filter(Boolean).join(' + ');
    }

    toString() {
        return this.toStr('toString');
    }
}