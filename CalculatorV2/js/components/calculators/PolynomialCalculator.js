class PolynomialCalculator {

    polynomial(members = []) {
        return new Polynomial(members);
    }


    add(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power == elemA.power);

            if(member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member (elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if(!members.find(el => el.power == elemB.power)) {
                members.push(new Member (elemB.value, elemB.power));
            }
        });
        for(let i = members.length - 1; i >= 0; i--) {
            if(members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return new Polynomial(members);
    }

    sub(a, b) {
        const calc = new Calculator();
        const members = [];
    
        // Вычитаем члены первого полинома
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
    
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
    
        // Добавляем члены второго полинома с отрицательными коэффициентами
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power)); // Используем -elemB.value
            }
        });
    
        // Удаляем нулевые члены
        const nonZeroMembers = members.filter(member => member.value !== 0);
    
        return new Polynomial(nonZeroMembers);
    }
    

    mult(a, b) {
        const calc = new Calculator;
        let polynomial = new Polynomial;
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member (
                    calc.mult(elemA.value, elemB.value),
                    calc.add(elemA.power, elemB.power)
                ));
            });
            for(let i = members.length - 1; i >= 0; i--) {
                if(members[i].value === 0) {
                    return members.slice(0, i);
                }
            }
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    prod(a, p) {
        if (typeof p === 'number') {
            if (a instanceof Polynomial) {
                const newMembers = a.poly.map(member => 
                    new Member(member.value * p, member.power)
                );
                return new Polynomial(newMembers);
            }
            return null;
        }
        return this.get(a).prod(a, p);
    }

    zero() {
        return new Polynomial([new Member(0, 0)]); // Возвращаем нулевой полином
    }
    
}