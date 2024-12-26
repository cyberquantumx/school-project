class ComplexCalculator extends RealCalculator {

    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(
            a.re * b.re - a.im * b.im,
            a.re * b.im + a.im * b.re
        );
    }

    div(a, b) {
        const denominator = b.re * b.re + b.im * b.im;
        return new Complex(
            (a.re * b.re + a.im * b.im) / denominator, 
            (a.im * b.re - a.re * b.im) / denominator
        );
    }

    prod(a, p) {
        return new Complex(a.re * p, a.im * p);
    }

    zero() { 
        return new Complex();
    }

    one() { 
        return new Complex(1, 0);
    }

    pow(a, n) {
        let result = this.one();
        for (let i = 0; i < n; i++) {
            result = this.mult(result, a);
        }
        return result;
    }
}