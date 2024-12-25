class Calculator extends RealCalculator {
    toValue(str) {
        if (!str) return 0;
        if (str.includes('x^')) {
            return this.toPolynomial(str);
        }
        if (str.includes('\n')) {
            return this.toMatrix(str);
        }
        if (str.includes('(')) {
            return this.toVector(str);
        }
        if (str.includes('i')) {
            return this.toComplex(str);
        }
        const value = parseFloat(str);
        return isNaN(value) ? 0 : value;
    }

    toPolynomial(str) {
        if (Array.isArray(str)) {
            return new Polynomial(str);
        }

        if (typeof str === 'string' && str.trim()) {
            const members = [];
            const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+]/g).filter(Boolean);

            for (let i = 0; i < arrStr.length; i++) {
                const member = this.toMember(arrStr[i]);
                if (member) {
                    members.push(member);
                } else {
                    console.error(`Invalid member: ${arrStr[i]}`);
                }
            }

            if (members.length > 0) {
                return new Polynomial(members);
            } else {
                return null;
            }
        }

        return null;
    }

    toMember(str) {
        if (typeof str === 'number') {
            return new Member(str);
        }
        if (typeof str === 'string' && str) {
            str = str.replace(/^\*/, '').trim();
            const arrStr = str.split('x^');
            if (arrStr.length === 2) {
                const coefficientStr = arrStr[0].trim();
                const coefficient = coefficientStr === '' ? 1 : this.toValue(coefficientStr);
                return new Member(coefficient, parseInt(arrStr[1], 10));
            } else {
                if (str.includes('x')) {
                    const coefficientStr = str.replace('x', '').trim();
                    const coefficient = coefficientStr === '' ? 1 : this.toValue(coefficientStr);
                    return new Member(coefficient, 1);
                } else {
                    return new Member(this.toValue(str), 0);
                }
            }
        }
        return null;
    }

    toComplex(str) {
        if (typeof str === 'number') {
            return new Complex(str);
        }
        if (str && typeof str === 'string') {
            const regex = /([+-]?\d*\.?\d*)\s*([+-]?\d*\.?\d*)i/;
            const match = str.match(regex);

            if (match) {
                const realPart = match[1] ? parseFloat(match[1]) : 0;
                const imaginaryPart = match[2] ? parseFloat(match[2]) : 0;
                return new Complex(realPart, imaginaryPart);
            }

            const num = Number(str);
            if (!isNaN(num)) {
                return new Complex(num);
            }
        }
        return null;
    }

    toVector(str) {
        if (str instanceof Array) {
            return new Vector(str);
        }
        if (str && typeof str == 'string') {
            const arr = str.replace('(', '').replace(')', '').split(' ').map(el => this.toValue(el));
            return new Vector(arr);
        }
        return null;
    }

    toMatrix(str) {
        if (str instanceof Array) {
            return new Matrix(str);
        }
        if (str && typeof str === 'string') {
            const arr = str.split('\n');
            const values = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].trim().split(/\s+/).map(el => this.toValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return null;
    }

    member(value, power) {
        return new Member(value, power);
    }

    polynomial(members) {
        return new Polynomial(members);
    }

    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    zero(type, elem) {
        type = type ? 
        type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator).zero();
            case 'Vector':
                return (new VectorCalculator).zero(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator).zero(elem.values.length, elem.values[0][0]);
        }
        console.log(super.zero())
        return super.zero();
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator).one();
            case 'Vector':
                return (new VectorCalculator).one(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator).one(elem.values.length, elem.values[0][0]);
        }
        return super.one();
    }

    prod(a, p) {
        if (typeof p == 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }

    pow(a, n) {
        if (typeof n == 'number') {
            return this.get(a).pow(a, n);
        }
    }
}
