let User = {
    name: '',
    balance: 50,
    energy: {
        value: 5,
        max: 10
    },
    hp: {
        value: 10,
        max: 10
    },
    mood: {
        max: 10,
        value: 5
    }
}

let DefaultUser = {
    balance: 50,
    energy: {
        value: 5,
        max: 10
    },
    hp: {
        value: 10,
        max: 10
    },
    mood: {
        max: 10,
        value: 5
    }
}


function entry(d) {
    let _name = d ? d : document.getElementById('regName').value;
    if (_name) {
        User.name = _name;
        document.getElementsByClassName('startUser')[0].classList.add('disable');
        document.getElementsByClassName('roomContainer')[0].classList.remove('disable');
        updateProfile();
    }
}

function updateProfile() {
    document.getElementById('username').innerHTML = `👤 <b>${User.name}</b>`;
    document.getElementById('balance').innerHTML = `💵 <b>${User.balance} ₽</b>`;
    document.getElementById('hp').innerHTML = `❤️ <b>${User.hp.value}/${User.hp.max}</b>`;
    document.getElementById('energy').innerHTML = `⚡ <b>${User.energy.value}/${User.energy.max}</b>`;
    document.getElementById('mood').innerHTML = `🥰 <b>${User.mood.value}/${User.mood.max}</b>`;
}