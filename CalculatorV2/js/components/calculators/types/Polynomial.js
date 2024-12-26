class Polynomial {
    constructor(poly = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(a) {
        const calc = new Calculator();
        return this.poly.reduce((s, elem) =>
            calc.add(s, calc.prod(calc.pow(a, elem.power), elem.value)),
            calc.zero()
        );
    }

    toStr() {
        return this.poly.map((el) => {
            if (el.value === 0) {
                return ''; 
            } else if (el.power === '0') {
                return `${el.value}`;
            } else if (el.power === '1') {
                return `${el.value === 1 ? '' : el.value}x`;
            } else {
                return `${el.value === 1 ? '' : el.value}x^${el.power}`;
            }
        }).filter(Boolean)
        .join(' + ')
        .replace(/\+\s+-/g, '- ')
        .replace(/\s+/g, ' ')
        .replace(/x\^1/g, 'x')
        .replace(/x\^0/g, '');
    }

    toString() {
        return this.toStr('toString');
    }
}