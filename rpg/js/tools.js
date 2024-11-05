function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function formatNumber(number = 0) {
    return new Intl.NumberFormat('ja-JP').format(number)
}

function warn(text){
    SnackBar({
        message: text,
        dismissible: false,
        status: 'warning',
        timeout: 3000
    });
}

function success(text){
    SnackBar({
        message: text,
        dismissible: false,
        status: 'success',
        timeout: 3000
    });
}

function error(text){
    SnackBar({
        message: text,
        dismissible: false,
        status: 'error',
        timeout: 3000
    });
}

function danger(text){
    SnackBar({
        message: text,
        dismissible: false,
        status: 'error',
        timeout: 3000
    });
}