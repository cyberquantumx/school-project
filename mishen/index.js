//cube
target_w = 10
target_h = 10
radius = 10

WIN_TEXT = 'Ты попал!'
LOSE_TEXT = 'Не попал!'
E_COR = 'Введи координаты!'

function r(text){
    return document.getElementById('res').textContent = String(text);
}

function getPos(){
    x = document.getElementById('x').value;
    y = document.getElementById('y').value;
    if (x == '' || y == ''){ 
        return alert(E_COR) 
    } else {
        console.log(x,y)
        return [Math.abs(x),Math.abs(y)]
    }
}


function start(t){
    s = square();
    if (s == undefined) return;
    r(s ? WIN_TEXT : LOSE_TEXT)
    //r(circle() ? WIN_TEXT : LOSE_TEXT)
}

function start2(t){
    c = circle();
    if (c == undefined) return;
    r(c ? WIN_TEXT : LOSE_TEXT)
}


function square(){
    try {
        pos = getPos()
        x = pos[0]
        y = pos[1]
        return (!((x > target_w) || (y > target_h)))
    } catch (err){
        console.error(':(')
    }
    
}

function circle(){
    try {
        pos = getPos()
        x = pos[0]
        y = pos[1]
        return ((x**2 + y**2) <= radius**2)
    } catch (err){
        console.error(':(')
    }
    
}