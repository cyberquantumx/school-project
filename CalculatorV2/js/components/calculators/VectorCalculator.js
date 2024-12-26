class VectorCalculator extends RealCalculator {
    add(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((el, i) => calc.add(el, b.values[i])));
    }

    sub(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((el, i) => calc.sub(el, b.values[i])));
    }

    mult(a, b) {
        if (a.values.length !== 2 && a.values.length !== 3) {
            throw new Error("Vector A либо два либо три");
        }
        if (b.values.length !== 2 && b.values.length !== 3) {
            throw new Error("Vector B либо два либо три.");
        }
        if (a.values.length === 2 && b.values.length === 2) {
            const scalarProduct = a.values[0] * b.values[0] + a.values[1] * b.values[1];
            console.log(`2D: ${scalarProduct}`);
            return new Vector([scalarProduct]);
        }
        if (a.values.length === 3 && b.values.length === 3) {
            const calc = this.get(a.values[0]);
            const results = [
                calc.sub(calc.mult(a.values[1], b.values[2]), calc.mult(a.values[2], b.values[1])),
                calc.sub(calc.mult(a.values[2], b.values[0]), calc.mult(a.values[0], b.values[2])),
                calc.sub(calc.mult(a.values[0], b.values[1]), calc.mult(a.values[1], b.values[0]))
            ];
            console.log(`3D: ${results}`);
            return new Vector(results);
        }
        throw new Error("либо два либо три");
    }

    prod(a, p) {
        const calc = this.get(a.values[0]);
        console.log(`Calculator: ${calc}`);
        const resultValues = a.values.map(el => {
            const result = calc.prod(el, p);
            return result;
        });
        console.log(resultValues);
        return new Vector(resultValues);
    }

    div() { 
        return null;
    }

    zero(len, elem) {
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < len; i++) {
            values.push(this.type(calc, elem, 'zero'));
        }
        return new Vector(values);
    }

    one(len, elem) {
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < len; i++) {
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }
    
    pow(a, n) {
        let c = this.one(a.values.length, a.values[0]);
        for(let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }
}