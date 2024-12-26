class PolynomialCalculator {
    add(a, b) {
        const membersMap = new Map();
        a.poly.forEach(elemA => {
            const key = elemA.power;
            membersMap.set(key, (membersMap.get(key) || 0) + elemA.value);
        });
        b.poly.forEach(elemB => {
            const key = elemB.power;
            membersMap.set(key, (membersMap.get(key) || 0) + elemB.value);
        });
        const members = [];
        membersMap.forEach((value, power) => {
            if (value !== 0) {
                members.push(new Member(value, power));
            }
        });
        return new Polynomial(members);
    }

    sub(a, b) {
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value - member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        const nonZeroMembers = members.filter(member => member.value !== 0);
        return new Polynomial(nonZeroMembers);
    }

    mult(a, b) {
        const membersMap = new Map();
        a.poly.forEach(elemA => {
            b.poly.forEach(elemB => {
                const newCoefficient = elemA.value * elemB.value;
                const newPower = this.combinePowers(elemA.power, elemB.power);
                membersMap.set(newPower, (membersMap.get(newPower) || 0) + newCoefficient);
            });
        });
        const members = [];
        membersMap.forEach((value, power) => {
            if (value !== 0) {
                members.push(new Member(value, power));
            }
        });
        return new Polynomial(members);
    }

    combinePowers(powerA, powerB) {
        if (!isNaN(powerA) && !isNaN(powerB)) {
            return (parseInt(powerA) + parseInt(powerB)).toString();
        }
        return `${powerA}^${powerB}`;
    }

    zero() {
        return new Polynomial([new Member(0, 0)]);
    }
}