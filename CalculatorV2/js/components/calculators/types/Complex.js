class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }
    
    toString() {
        if (this.im === 0) {
            return this.re.toString();
        } else if (this.re === 0) {
            return `${this.im}i`;
        } else if (this.im < 0) {
            return `${this.re} - ${-this.im}i`;
        } else {
            return `${this.re} + ${this.im}i`;
        }
    }
}