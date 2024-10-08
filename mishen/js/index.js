var TARGET_IMG = 'mishen2.png';

var TEXT = {
    COORDINATE_ERR: 'Введите координаты',
    MISS_TARGET: 'Не попал',
    SUCCESS_TARGET: 'Попал',
    RADIUS_ERR: 'Не указан радиус'
}

var DOT = {
    STROKE: {
        COLOR: 'white',
        SIZE: 10
    },
    COLOR: 'black',
    SIZE: 5
}

var BASE_IMAGE_SIZE = {
    WIDTH: 200,
    HEIGHT: 200
}

var SNACKBAR_TIMEOUT = 2500;

var DEBUG = false;

var POINTS = {
    MISS: 0,
    CENTER: 10,
    HYPERBOLA: 5,
    RHOMB: 3,
    CIRCLE: 2,
    SQUARE: 1,
}

var KEY = 900;

valueObj = $('#score');
inputX = $('#x');
inputY = $('#y');

pos = {};

canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
image = new Image(BASE_IMAGE_SIZE.WIDTH, BASE_IMAGE_SIZE.HEIGHT);

score = 0;
radius = 5;

function message(text) {
    SnackBar({
        message: text,
        dismissible: !DEBUG,
        status: 'success',
        timeout: SNACKBAR_TIMEOUT
    });
}

function error(text) {
    SnackBar({
        message: text,
        dismissible: !DEBUG,
        status: 'error',
        timeout: SNACKBAR_TIMEOUT
    });
}

function warn(text) {
    SnackBar({
        message: text,
        dismissible: !DEBUG,
        status: 'warn',
        timeout: SNACKBAR_TIMEOUT
    });
}



const Data = {
    get: (cookieObject) => {
        let name = `${cookieObject}=`;
        let cookieArray = document.cookie.split(';');
        for (i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return false;
    },

    set: (name, value) => {
        return document.cookie = `${name}=${value};path=/;SameSite=Strict;`;
    },
}

function xor(str) {
    output = '';
    key = 320

    for (var i = 0; i < str.length; ++i) {
        output += String.fromCharCode(key ^ str.charCodeAt(i))
    }

    return output
}

function getPosition() {
    x = inputX.val();
    y = inputY.val();

    if (!radius) {
        error(TEXT.RADIUS_ERR);
        return null;
    }

    if (x === '' || y === '') {
        error(TEXT.COORDINATE_ERR);
        return null;
    }

    return ({
        x: Number(x),
        y: Number(y),
        absX: Math.abs(x),
        absY: Math.abs(y)
    })
}

function drawTarget() {
    if (image) {
        image.onload = () => {
            canvas.width = (innerHeight - 8) / 3;
            canvas.height = (innerHeight - 8) / 3;
            scaleImg = Math.min(canvas.width / image.naturalWidth,
                canvas.height / image.naturalHeight);
            imgX = (canvas.width / 2 - (image.naturalWidth / 2) * scaleImg) | 0;

            imgWidth = image.naturalWidth * scaleImg;
            imgHeight = image.naturalHeight * scaleImg;

            ctx.drawImage(image, imgX, 0, imgWidth, imgHeight);
        }
        image.src = TARGET_IMG;
        return true;
    }
}

function drawHit(x, y) {
    dotX = ((canvas.width / 2) - 5) + (canvas.width * (0.048 * x));
    dotY = ((canvas.height / 2) - 6) - (canvas.height * (0.048 * y));
    ctx.fillStyle = DOT.STROKE.COLOR;
    ctx.fillRect(dotX, dotY, DOT.STROKE.SIZE, DOT.STROKE.SIZE);
    ctx.fillStyle = DOT.COLOR;
    ctx.fillRect(dotX + DOT.SIZE / 2, dotY + DOT.SIZE / 2, DOT.SIZE, DOT.SIZE);
}

$(document).ready(() => {
    score = Number(xor(Data.get('score')))
    valueObj.text(score);
    console.log(score)
    drawTarget();
})

function check(randomState) {
    if (randomState) pos = {
        x: randomState[0],
        y: randomState[1],
        absX: Math.abs(randomState[0]),
        absY: Math.abs(randomState[1])
    }
    else pos = getPosition()
    if (pos == null) return;

    result = (pos.x === 0 && pos.y === 0) ? POINTS.CENTER : 0 || //центр
        (1 / pos.absX >= pos.absY) ? POINTS.HYPERBOLA : 0 || //гипербола
        ((pos.absX + pos.absY) / 2 <= radius) ? POINTS.RHOMB : 0 || //ромб
        ((pos.absX ** 2 + pos.absY ** 2) <= (radius * 2) ** 2) ? POINTS.CIRCLE : 0 || //круг
        ((pos.absX <= radius * 2) && (pos.absY) <= (radius * 2)) ? POINTS.SQUARE : 0; //квадрат

    score += result;
    DEBUG ? console.log(score, pos) : null;

    if (result != 0) message(`${TEXT.SUCCESS_TARGET} +${result}`)
    else warn(TEXT.MISS_TARGET);

    drawHit(pos.x, pos.y);

    inputX.val('');
    inputY.val('');

    Data.set('score', xor(score.toString()));
    valueObj.text(score);
    if (randomState) return result;

}

async function random() {
    
    function getRandomNumber(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTarget()
    setTimeout(() => {
        hits = [0, 0, 0, 0, 0]
        for (let i = 0; i < $('#count').val(); i++) {
            x = getRandomNumber(-10, 10);
            y = getRandomNumber(-10, 10);
            r = check([x, y])
            switch (r) {
                case POINTS.CENTER:
                    hits[0]++
                    break;
                case POINTS.HYPERBOLA:
                    hits[1]++
                    break;
                case POINTS.RHOMB:
                    hits[2]++
                    break;
                case POINTS.CIRCLE:
                    hits[3]++
                    break;
                case POINTS.SQUARE:
                    hits[4]++
                    break;
            }
        }
        alert(`
        Центр: ${hits[0]}
        Гипербола: ${hits[1]}
        Ромб: ${hits[2]}
        Круг: ${hits[3]}
        Квадрат: ${hits[4]}
    `)
    }, 500)

}

function disableXY() {
    x = $("#x");
    y = $("#y");
    check_btn = $('#check_btn');
    if ($('#count').val()) {
        x.prop('disabled', true);
        y.prop('disabled', true);
        x.addClass('disabled');
        y.addClass('disabled');
        check_btn.addClass('disabled');
        check_btn.prop('disabled', true);
    } else {
        x.prop('disabled', false);
        y.prop('disabled', false);
        x.removeClass('disabled');
        y.removeClass('disabled');
        check_btn.removeClass('disabled');
        check_btn.prop('disabled', false);
    }
}

function clearData() {
    document.cookie = 'score=Ű';
    window.location.reload();
}