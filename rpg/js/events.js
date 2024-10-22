
function LookWindow() {
    //add mood
    if (User.mood.value + 5 > User.mood.max) User.mood.value = User.mood.max;
    else User.mood.value += 5;
    alert('вы посмотрели в окно')
    updateProfile()
}

function die(){
    User.hp.value = 0;
    updateProfile();
    return true;
}

function respawn(){
    User.hp.value = DefaultUser.hp.value;
    User.hp.max = DefaultUser.hp.max;

    User.energy.value = DefaultUser.energy.value;
    User.energy.max = DefaultUser.energy.max;

    User.mood.value = DefaultUser.mood.value;
    User.mood.max = DefaultUser.mood.max;

    User.balance = DefaultUser.balance;

    updateProfile();
    changeRoom();
    return console.log('respawn')
}