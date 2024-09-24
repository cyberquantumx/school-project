
//базовые значения

p = [0, 10, 5, 3, 2, 1]
rad = 5
side = 10
score = 0
pos = []

canvas = document.getElementById("canvas")
ctx = canvas.getContext('2d')
image = new Image(200,200);

debug = false

function msg({t, s, to = 2500}){
    SnackBar({
        message: t,
        dismissible: true,
        status: s,
        timeout: to
    });
}

function r(text, status="success"){
    msg({t: text, s: status})
}


function update(){
    document.getElementById('score').textContent = score;
    debug ? console.log(score) : null;
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
    document.cookie = `score=${score}`;
}

function getPos(){
    x = document.getElementById('x').value;
    y = document.getElementById('y').value;
    if (x == '' || y == '' || rad== ''){ 
       msg({t: 'Введите координаты', s: 'error'})
    } else {
        debug ? console.log(x,y,rad,side, score) : null
        return [Math.abs(x),Math.abs(y), x,y]
    }
}

function start(){
    try {
        _r = 0;
        pos = getPos()
        if(center() == true){
            _r = 1
        } else if(square() == true){
            if(giper2() == true){
                _r = 2
            } else if(romb() == true){
                _r = 3
            } else if(circle() == true){
                _r = 4
            } else {
                _r = 5
            }
        }
        score += p[_r]
        msg({t: _r ? `+${p[_r]}` : 'не попал', s: _r ? 'success' : 'warning'})
        image.onload = function() {
            canvas.width = (innerHeight - 8) / 3;
            canvas.height = (innerHeight - 8) / 3;
            _scale = Math.min( canvas.width /image.naturalWidth , canvas.height / image.naturalHeight );
            _x = (canvas.width / 2 - (image.naturalWidth / 2) * _scale) | 0;
            _y = (canvas.height / 2 - (image.naturalHeight / 2) * _scale) | 0;
            canvas.getContext("2d").drawImage(image,_x,0,image.naturalWidth * _scale, image.naturalHeight * _scale);
            __x = ((canvas.width/2)-7) + (canvas.width*(0.048*x))
            __y = ((canvas.height/2)-4) - (canvas.height*(0.048*y))
            ctx.fillStyle = "white";
            ctx.fillRect(__x, __y, 10,10);
            ctx.fillStyle = "black";
            ctx.fillRect(__x+2.5, __y+2.5, 5,5);
        }
        image.src = 'mishen2.png';
        update();
        
    } catch (e) {
        debug ? msg({t: String(e.message + e.stack), s: 'error', to: false}) : null;
    }
}

function square(){
    return ((pos[0] <= side) && (pos[1]) <= side)
}

function center(){
    return pos[0] == 0 && pos[1] == 0
}

function circle(){
    pos = getPos()
    return ((pos[0]**2 + pos[1]**2) <= side**2)
}

function giper2(){
    return (1/pos[0] >= pos[1])
}

function romb(){
    return ((pos[0]+pos[1])/2<=side/2)
}

window.onload = function() {
    cookie = document.cookie
    if(cookie){
        data = cookie.split('=')
        console.log(data)
        score = Number(data[1])
        update()
    }
}

function clearCookie(){
    document.cookie = 'score=0';
    window.location.reload();
}