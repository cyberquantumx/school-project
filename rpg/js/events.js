function runEvent(event){
    return event;
}

const Events = {
    step: () => {
        console.log(User.hp)
        Events.randomMoney();
        if(User.hp.value > 1) User.hp.value--; 
            else {
                Events.die(); 
                Events.respawn();
            }
        updateProfile();
    },

    randomMoney: () => {
        if( getRandomInteger(1,4) == 1 ){
            _i = getRandomInteger(0,5);
            _r = [1,10,30,5,18,45];
            User.balance += _r[_i];
            success(`вы получили ${_r[_i]} ₽`);
        }
    },

    healHp: (i) => {
        let _h = [5,10], _m = [20,40];
        if(User.balance >= _m[i]) {
            if(User.hp.value + _h[i] > User.hp.max) User.hp.value = User.hp.max
                else User.hp.value += _h[i]

            User.balance -= _m[i];
            updateProfile();
            success('Здоровье полечено');
        } else {
            warn('Не хватает денег');
        }
        
    },

    lookWindow: () => {
        if (User.mood.value + 5 > User.mood.max) User.mood.value = User.mood.max;
        else User.mood.value += 5;

        if (User.hp.value + 2 > User.hp.max) User.hp.value = User.hp.max;
        else User.hp.value += 2;

        document.getElementById('lookwindow').setAttribute('disabled', '');

        success('Вы посмотрели в окно');
        
        Events.cooldown(3);
        updateProfile();
        return true;
    },

    die: () => {
        User.hp.value = 0;
        updateProfile();
	    console.log('ты умер');
        danger('Ты умер!');
    },

    respawn: () => {
        User.hp.value = DefaultUser.hp.value;
        User.hp.max = DefaultUser.hp.max;

        User.energy.value = DefaultUser.energy.value;
        User.energy.max = DefaultUser.energy.max;

        User.mood.value = DefaultUser.mood.value;
        User.mood.max = DefaultUser.mood.max;

        User.balance = DefaultUser.balance;

        updateProfile();
        changeRoom(0);
        console.log('respawn');
        return true;
    },

    cooldown: (s) => {
        console.log(exits.children, events.children)
        let _disableBtnExits = [], _disableBtnEvents = [];
        
        document.getElementById('timeoutContainerId').classList.remove('disabled');
        document.getElementById('root').classList.add('cooldown');

        for(let i = 0; i < exits.children.length; i++){
            let c = exits.children.item(i);  
            if(!c.hasAttribute('disabled')){
                c.setAttribute('disabled', '');
                c.classList.add('cooldown');
                _disableBtnExits.push(c);
            }
        }

        for(let i = 0; i < events.children.length; i++){
            let c = events.children.item(i); 
            if(!c.hasAttribute('disabled')){
                c.setAttribute('disabled', '');
                c.classList.add('cooldown');
                _disableBtnEvents.push(c);
            }
        }

        let timeoutText = document.getElementById('timeoutText'), time = s;
        timeoutText.innerText = `⏰ ${time}с`;

        let interval = setInterval(() => {
            time--;
            timeoutText.innerText = `⏰ ${time}с`
        }, 1 * 1000);

        setTimeout(() => {
            _disableBtnEvents.map((b) => {
                b.removeAttribute('disabled');
                b.classList.remove('cooldown');
            })
            _disableBtnExits.map((b) => {
                b.removeAttribute('disabled');
                b.classList.remove('cooldown');
            })
            clearInterval(interval);
            timeoutText.innerText = '';
            document.getElementById('timeoutContainerId').classList.add('disabled');
            document.getElementById('root').classList.remove('cooldown');
        }, s * 1000)
    }

}