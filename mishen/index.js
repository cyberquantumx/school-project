//базовые значения
rad = 5
side = 10
points = 0
E_COR = 'Введи координаты!'
pos = []
canvas = document.getElementById("canvas")
ctx = canvas.getContext('2d')
image = new Image(200,200);

function r(text){
    return document.getElementById('res').textContent = String(text);
}

function update(){
    document.getElementById('score').textContent = `Очки: ${points}`;
    console.log(points);
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
}

function getPos(){
    x = document.getElementById('x').value;
    y = document.getElementById('y').value;
    rad = document.getElementById('rad').value;
    if (x == '' || y == '' || rad== ''){ 
        return alert(E_COR) 
    } else {
        console.log(x,y,rad,side)
        return [Math.abs(x),Math.abs(y), x,y]
    }
}

function start(){
    try {
        pos = getPos()
        if(center() == true){
            r('10 очков')
            points += 10
        } else if(square() == true){
            if(giper2() == true){
                r('5 очков')
                points += 5
            } else if(romb() == true){
                r('3 очка')
                points += 3
            } else if(circle() == true){
                r('2 очка')
                points += 2
            } else {
                r('1 очко')
                points += 1
            }
        } else {
            r('не попал!')
        }
        update()
        
        image.onload = function() {
            canvas.width = (innerHeight - 8) / 3;
            canvas.height = (innerHeight - 8) / 3;
            _scale = Math.min( canvas.width /image.naturalWidth , canvas.height / image.naturalHeight );
            _x = (canvas.width / 2 - (image.naturalWidth / 2) * _scale) | 0;
            _y = (canvas.height / 2 - (image.naturalHeight / 2) * _scale) | 0;
            canvas.getContext("2d").drawImage(image,_x,0,image.naturalWidth * _scale, image.naturalHeight * _scale);
            __x = ((canvas.width/2)-7) + (canvas.width*(0.048*x))
            __y = ((canvas.height/2)-4) - (canvas.height*(0.048*y))
            ctx.fillRect(__x, __y, 10,10);
            ctx.fillStyle = "white";
            ctx.fillRect(__x+2.5, __y+2.5, 5,5);
        }
        image.src = 'mishen.png';
        update();
        
    } catch (e) {
        console.log('ошибка :(')
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

function giper(){
    
    return (((x+side/2)**2+(y+side/2)**2>=(side/2)**2)&&
    ((x-side/2)**2+(y+side/2)**2>=(side/2)**2)&&
    ((x+side/2)**2+(y-side/2)**2>=(side/2)**2)&&
    ((x-side/2)**2+(y-side/2)**2>=(side/2)**2))
}

function giper2(){
    return (1/pos[0] >= pos[1])
}

function romb(){
    return ((pos[0]+pos[1])/2<=side/2)
}