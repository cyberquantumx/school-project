let getZero = function (f, a, b, eps = 0.001) {
    if (f(a) * f(b) > 0) return null;
    if (Math.abs(f(a) - f(b)) <= eps) return (a + b) / 2;
    var half = (a + b) / 2;
    if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps);
    if (f(half) * f(b) <= 0) return this.getZero(f, half, b, eps);
}

let getDerivative = function (f1, f2, h=1e-5) {
    var dx = 0.000001;
    return (f1 - f2) / h;
}

let getIntegral = function (f, a, b) {
    var dx = (b - a) / 1000;
    var x = a;
    var S = 0;
    while (x <= b) {
        S += Math.abs(f(x)) + Math.abs(f(x + dx)) / 2 * dx;
        x += dx;
    }
    return S;
}