class Member {
    constructor(value = 0, power = 0) {
        this.value = value;
        this.power = power;
    }

    toString() {
        if (this.value === 0) {
            return ''; // Не выводим нулевые члены
        }
        if (this.power === 0) {
            return `${this.value}`; // Если степень 0, выводим только значение
        }
        return `${this.value}x^${this.power}`;
    }
}