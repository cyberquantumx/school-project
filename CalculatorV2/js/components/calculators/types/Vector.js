class Vector {
    constructor(values) {
        this.values = values;
    }

    toString() {
        return `(${this.values.join(' ')})`;
    }
}
