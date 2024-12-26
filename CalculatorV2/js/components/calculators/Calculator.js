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

    toMember(memberStr) {
        const regex = /([+-]?\d*)(x(?:\^([^\s+-]*))?)/;
        const match = memberStr.match(regex);

        if (match) {
            const coefficient = match[1] === '' || match[1] === '+' ? 1 :
                               match[1] === '-' ? -1 : parseInt(match[1]);

            const power = match[3] ? match[3] : '1';

            return new Member(coefficient, power);
        } else {
            const numberMatch = /([+-]?\d+)/.exec(memberStr);
            if (numberMatch) {
                return new Member(parseInt(numberMatch[1]), '0');
            }
        }

        return null;
    }

    parseComplexExpression(expression) {
        expression = expression.replace(/\s+/g, '');
        const regex = /([+-]?\d*\.?\d+)?([+-]?\d*\.?\d*)?i/g;
        let match;
        let realSum = 0;
        let imaginarySum = 0;

        while ((match = regex.exec(expression)) !== null) {
            if (match[1] !== undefined) {
                realSum += parseFloat(match[1]) || 0;
            }
            if (match[2] !== undefined) {
                const imaginaryPart = match[2] ? parseFloat(match[2]) : 1;
                imaginarySum += imaginaryPart;
            }
        }
    
        return `${imaginarySum} + ${realSum}i`;
    }

    toPolynomial(str) {
        if (Array.isArray(str)) return new Polynomial(str);

        if (typeof str === 'string' && str.trim()) {
            const members = [];
            const arrStr = str.replace(/\s+/g, '').split(/(?=\+|-)/);

            arrStr.forEach(memberStr => {
                const member = this.toMember(memberStr);
                if (member) {
                    members.push(member);
                } else {
                    console.error(`Invalid member: ${memberStr}`);
                }
            });

            return members.length > 0 ? new Polynomial(members) : null;
        }

        return null;
    }
    
    toComplex(str) {
        if (typeof str === 'number') return new Complex(str, 0);

        if (str && typeof str === 'string') {
            str = this.parseComplexExpression(str);
            console.log(str)
            str = str.replace(/\s+/g, '');
            const regex = /^([+-]?\d*\.?\d+)?([+-]?\d*\.?\d*)?i$/;
            const match = str.match(regex);

            if (match) {
                const realPart = match[1] !== undefined ? parseFloat(match[1]) : 0;
                const imaginaryPart = match[2] !== undefined ? parseFloat(match[2]) : (str.endsWith('i') ? 1 : 0);

                if (str.endsWith('i') && match[2] === undefined) {
                    return new Complex(realPart, 1);
                }

                return new Complex(realPart, imaginaryPart);
            }

            const num = Number(str);
            if (!isNaN(num)) {
                return new Complex(num, 0);
            }
        }
        
        console.error(`Invalid input: ${str}`);
        return null;
    }
    
    toVector(str) {
        if (str instanceof Array) {
            return new Vector(str);
        }
        if (str && typeof str === 'string') {
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
            return values[0] instanceof Array ? new Matrix(values) : null;
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
        type = type || (elem ? elem.constructor.name : null);
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator()).zero();
            case 'Vector':
                return (new VectorCalculator()).zero(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator()).zero(elem.values.length, elem.values[0][0]);
        }
        return super.zero();
    }

    one(type, elem) {
        type = type || (elem ? elem.constructor.name : null);
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator()).one();
            case 'Vector':
                return (new VectorCalculator()).one(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator()).one(elem.values.length, elem.values[0][0]);
        }
        return super.one();
    }

    prod(a, p) {
        if (typeof p === 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }

    pow(a, n) {
        if (typeof n === 'number') {
            return this.get(a).pow(a, n);
        }
        return null;
    }
}