function Graph(options) {
    options = options || {};
    let id = options.id;
    let body = options.body || document.querySelector('body');
    let width = options.width || 500;
    let height = options.height || 500;
    let WIN = options.WIN || {};
    let canvas;
    if (id) canvas = document.getElementById(id)
    else {
        canvas = document.createElement('canvas');
        body.append(canvas);
    }

    canvas.width = width;
    canvas.height = height;

    this.defaultColors = {
        clearFill: "white",
        textColor: 'black'
    }
    let defaultColors = this.defaultColors;

    let context = canvas.getContext('2d');

    let callbacks = options.callbacks;

    function throttle(func, delay) {
        let lastExec = 0;
        return function() {
          const now = Date.now();
          if (now - lastExec > delay) {
            lastExec = now;
            func.apply(this, arguments);
          }
        }
      }

    canvas.addEventListener('wheel', callbacks.wheel)
    canvas.addEventListener('mouseup', callbacks.mouseup)
    canvas.addEventListener('mousedown', callbacks.mousedown)
    canvas.addEventListener('mousemove', callbacks.mousemove)
    canvas.addEventListener('mouseleave', callbacks.mouseleave)

    function xs(x) {
        return (x - WIN.left) / WIN.width * canvas.width;
    }

    function ys(y) {
        return canvas.height - (y - WIN.bottom) / WIN.height * canvas.width;
    }

    this.sx = (x) => {
        return x * WIN.width / canvas.width;
    }

    this.sy = (y) => {
        return -y * WIN.height / canvas.height;
    }

    this.line = (x1, y1, x2, y2, color, width = 2) => {
        context.beginPath();
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = width;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.closePath();
        context.stroke();
    }

    this.renderText = (text, x, y, fontsize = 14, color = this.defaultColors.textColor, shadowColor = 'black', shadowWidth = 0) => {
        context.fillStyle = color;
        context.shadowColor = shadowColor;
        context.shadowBlur = shadowWidth;
        context.font = 'bold ' + fontsize + 'px Arial';
        context.fillText(text, xs(x), ys(y));
        context.shadowBlur = 0;
    }

    this.point = (x, y, color = 'red', size = 2) => {
        context.fillStyle = color;
        context.strokeStyle = color;
        context.beginPath();
        context.arc(xs(x), ys(y), size, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.stroke();
    }

    this.polygon = function(points=[],color='#F805'){
        context.beginPath();
        context.stroleStyle = color;
        context.fillStyle = color;
        context.moveTo(xs(points[0].x),ys(points[0].y));
        for(var i=1; i<points.length;i++){
            context.lineTo(xs(points[i].x),ys(points[i].y));
        }
        context.lineTo(xs(points[0].x),ys(points[0].y));
        context.closePath();
        context.fill();
    }

    this.clear = () => {
        context.fillStyle = this.defaultColors.clearFill;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

export default Graph;