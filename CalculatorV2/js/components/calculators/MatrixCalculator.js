class MatrixCalculator extends RealCalculator {
    add(a, b) {
        console.log(a,b)
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((array, i) => 
            array.map((el, j) => calc.add(el, b.values[i][j]))
        ));
    }
    
    sub(a, b) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((array, i) => array.map((el, j) => calc.sub(el, b.values[i][j]))));
    }

    mult(a, b) {
        if (a.values[0].length !== b.values.length) {
            throw new Error("Неверные размеры матриц для умножения");
        }
        const calc = this.get(a.values[0][0]);
        const c = this.zero(a.values.length, b.values[0].length);
        for (let i = 0; i < a.values.length; i++) {
            for (let j = 0; j < b.values[0].length; j++) {
                let s = super.zero();
                for (let k = 0; k < a.values[0].length; k++) {
                    s += calc.mult(a.values[i][k], b.values[k][j]);
                }
                c.values[i][j] = s;
            }
        }
        return c;
    }
    
    prod(a, p) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map(array => array.map(el => calc.prod(el, p))));
    }

    div() { 
        return null;
    }

    zero(len, elem) {
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < len; i++) {
            values.push([]);
            for(let j = 0; j < len; j++) {
                values[i][j] = this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }

    one(len, elem) {
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < len; i++) {
            values.push([]);
            for(let j = 0; j < len; j++) {
                values[i][j] = this.type(calc, elem, (i === j) ? 'one' : 'zero');
            }
        }
        return new Matrix(values);
    }

    pow(a, n) {
        let c = this.one(a.values.length, a.values[0][0]);
        for(let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }
}