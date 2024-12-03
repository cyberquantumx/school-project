import e from '../js/evaluatex-2.1.2/src/evaluatex.js';
import UI from './ui.js';
import Graph from './graph.js';
const {
    abs,
    acos,
    acosh,
    asin,
    asinh,
    atan,
    atan2,
    atanh,
    ceil,
    cos,
    cosh,
    exp,
    floor,
    log,
    max,
    min,
    pow,
    random,
    round,
    sin,
    sinh,
    sqrt,
    tan,
    tanh
} = Math;




function main() {
    let WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20
    };

    let graph = new Graph({
        width: 700,
        height: 700,
        body: document.getElementById('canvas__container'),
        WIN: WIN,
        callbacks: {
            wheel: wheel,
            mouseup: mouseup,
            mousedown: mousedown,
            mousemove: mousemove,
            mouseleave: mouseleave
        }
    });

    new UI({
        callbacks: {
            addFunction: addFunction,
            delFunction: delFunction,
            setColor: setColor,
            setWidth: setWidth
        }
    })


    let funcs = [];

    function addFunction(f, num, fString) {
        console.log(f)
        if (!funcs[num]) {
            funcs[num] = {
                f: f,
                color: '#745eff',
                width: 2,
                fString: fString
            }
        } else {
            funcs[num].f = f;
            funcs[num].fString = fString;
        }
        render();
    }

    function delFunction(num) {
        funcs[num] = null;
        render();
    }

    function setColor(color, num) {
        if (funcs[num]) {
            funcs[num].color = color;
            render()
        }
    }

    function setWidth(width, num) {
        if (funcs[num]) {
            funcs[num].width = width;
            render()
        }
    }


    let zoom = 1,
        canMove = false;

    function render() {
        graph.clear();
        renderGrid();
        renderOXY();
        for (let i = 0; i < funcs.length; i++) {
            if (funcs[i]) {
                renderFunction(funcs[i].f, funcs[i].color, funcs[i].width, funcs[i].fString);
            }
        }
    }

    function renderTangent(f){
        let x = WIN.left,
        dx = WIN.width / 100;

        let t = e.parseTokens(f, {}, {
            latex: true
        });

        while (x < WIN.width + WIN.left) {
            let tangent = getDerivative(e.evaluatex(t, {x: 0+1e-5}), e.evaluatex(t, {x: 0}));
            graph.line(x, x+tangent, x+dx, x+tangent+dx, 'red', 2);
            x += dx;
        }

    }

    function renderFunction(f, color, width, fString) {
        let x = WIN.left,
            dx = WIN.width / 100;

        let t = e.parseTokens(f, {}, {
            latex: true
        });
        let points = [];
        let r,r2;

        //let tangent = getDerivative(e.evaluatex(t, {x: 2+1e-5}), e.evaluatex(t, {x: 2}));
        while (x < WIN.width + WIN.left) {
            r = e.evaluatex(t, {
                x: x
            });
            r2 = e.evaluatex(t, {
                x: x + dx
            });
            graph.line(x, r, x + dx, r2, color, width);
            x += dx;
            points.push({
                x: x,
                y: r
            });
        }
        
        graph.polygon(points)
        //renderTangent(f);
        graph.renderText(fString, 1, e.evaluatex(t, {x: 1}), 22, color);
    }

    function renderGrid() {
        //x+
        for (let i = 0; i < WIN.width + WIN.left; i++) {
            graph.line(i, WIN.bottom, i, WIN.height + WIN.bottom, 'grey', 1);
            if (i != 0) graph.renderText(i, i - 0.15, 0.2, 350 / WIN.width);
            if (i != 0) graph.line(i, -0.1, i, 0.1, 'black', 3)
        }
        //x-
        for (let i = 0; i > WIN.left; i--) {
            graph.line(i, WIN.bottom, i, WIN.height + WIN.bottom, 'grey', 1);
            if (i != 0) graph.renderText(i, i - 0.15, 0.2, 350 / WIN.width);
            if (i != 0) graph.line(i, -0.1, i, 0.1, 'black', 3)
        }
        //y+
        for (let i = 0; i < WIN.height + WIN.bottom; i++) {
            graph.line(WIN.left, i, WIN.width + WIN.left, i, 'grey', 1);
            if (i != 0) graph.renderText(i, 0.2, i - 0.15, 350 / WIN.height);
            if (i != 0) graph.line(-0.1, i, 0.1, i, 'black', 3)
        }
        //y-
        for (let i = 0; i > WIN.bottom; i--) {
            if (i != 0) graph.renderText(i, 0.2, i - 0.15, 350 / WIN.height);
            graph.line(WIN.left, i, WIN.width + WIN.left, i, 'grey', 1);
            if (i != 0) graph.line(-0.1, i, 0.1, i, 'black', 3)
        }

    }

    function renderOXY() {
        graph.line(WIN.left, 0, WIN.width + WIN.left, 0, 'black', 2);
        graph.line(0, WIN.bottom, 0, WIN.height + WIN.bottom, 'black', 1);
        graph.renderText('X', WIN.width + WIN.left - 1, 0.25, 16, 'black', 'white', 5);
        graph.renderText('Y', 0.25, WIN.height + WIN.bottom - 1, 16, 'black', 'white', 5);
    }

    function wheel(event) {
        let delta = (event.wheelDelta > 0) ? -zoom : zoom;
        if (WIN.width + delta > 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }

    }
    let rafId;
    var count = 1;
    async function mousemove(event) {
        if (canMove) {
            WIN.left -= graph.sx(event.movementX);
            WIN.bottom -= graph.sy(event.movementY);
            render();

        }
    }

    function mouseup() {
        canMove = false;
    }

    function mousedown() {
        canMove = true;
    }

    function mouseleave() {
        canMove = false;
    }

    render();

    (new FPSMeter({
        ui: true
    })).start();

}

window.onload = main, console.log(main);