let User = {
    name: '',
    balance: 50,
    energy: {
        value: 5,
        max: 10
    },
    hp: {
        value: 15,
        max: 15
    },
    mood: {
        max: 10,
        value: 5
    },
    currentRoom: 0,
    lastRoom: -1
}

let DefaultUser = {
    balance: 50,
    energy: {
        value: 5,
        max: 10
    },
    hp: {
        value: 15,
        max: 15
    },
    mood: {
        max: 10,
        value: 5
    },
    currentRoom: 0,
    lastRoom: -1
}

let AUTH_STATE = 0;

const Profile = {
    username: document.getElementById('username'),
    balance: document.getElementById('balance'),
    hp: document.getElementById('hp'),
    energy: document.getElementById('energy'),
    mood: document.getElementById('mood'),
    
    hpBar: document.getElementById('hp__bar'),
    energyBar: document.getElementById('energy__bar'),
    moodBar: document.getElementById('mood__bar'),
}

function loadUser() {
    let _data = localStorage.getItem('Data');
    if (_data) {
        let Data = JSON.parse(_data);

        entry(Data.name);
        User = Data;

        lastRoom = User.lastRoom;
        changeRoom(User.currentRoom);
        console.log(Data)
    }
}

function entry(d) {
    let _name = d ? d : document.getElementById('regName').value;
    if (_name) {
        User.name = _name;
        document.getElementsByClassName('startUser')[0].classList.add('disable');
        document.getElementsByClassName('roomContainer')[0].classList.remove('disable');
        AUTH_STATE = 1;
        updateProfile();
    }
}

function updateProfile() {
    saveData();
    Profile.username.innerHTML = `${User.name}`;
    Profile.balance.innerHTML = `💵&thinsp;${formatNumber(User.balance)}&thinsp;₽`;
    Profile.hp.innerHTML = `❤️&thinsp;${User.hp.value}/${User.hp.max}`;
    Profile.energy.innerHTML = `⚡&thinsp;${User.energy.value}/${User.energy.max}`;
    Profile.mood.innerHTML = `🥰&thinsp;${User.mood.value}/${User.mood.max}`;

    Profile.hpBar.max = User.hp.max;
    Profile.hpBar.value = User.hp.value;

    Profile.energyBar.max = User.energy.max;
    Profile.energyBar.value = User.energy.value;

    Profile.moodBar.max = User.mood.max;
    Profile.moodBar.value = User.mood.value;

}

function saveData() {
    if (AUTH_STATE == 1) localStorage.setItem('Data', JSON.stringify(User));
}

function clearData() {
    localStorage.clear();
    reload();
}

setInterval(() => saveData(), 10000);

window.onbeforeunload = saveData();