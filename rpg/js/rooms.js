const {
    exits,
    events
} = {
    exits: document.getElementById('buttonsRoom'),
    events: document.getElementById('buttonsRoomEvents')
}

let lastRoom = -1,
    currentRoom = 0;

async function render() {
    let room = rooms[currentRoom];
    document.getElementById('title').innerText = room.title;
    document.getElementById('description').innerText = room.description;
    document.getElementById('roomImage').src = 'img/rooms/' + room.img;

    if (room.roomEvent) {
        if(room.roomEvent[0].id == 'die'){
            Events.die();
            Events.cooldown(3);
            return setTimeout(() => {
                Events.respawn();
            }, 3000)
        }
    }
    
    updateProfile()
    exits.innerHTML = '';
    events.innerHTML = '';
    console.log(room)
    if (room.exits == 0) {
        /*
        let b = document.createElement('button');
        b.innerText = 'Начать заново';
        b.setAttribute('onClick', "runEvent(Events.respawn())");
        b.setAttribute('class', 'buttonRoom');
        b.setAttribute('id', 'restartBtn');
        exits.appendChild(b);
        */
    } else {
        let bck, frwrd;
        room.exits.map((e) => {
            forward = (lastRoom > currentRoom) && (lastRoom == e) && currentRoom != 0
            back = (lastRoom != -1 && currentRoom != 0 && e < currentRoom)
            if (back) {
                bck = document.createElement('button');
                bck.innerText = '<< ' + '🚪 ' + rooms[e].title;
                bck.setAttribute('onClick', `changeRoom(${e})`);
                bck.setAttribute('class', 'buttonRoom');
            } else if (forward) {
                frwrd = document.createElement('button');
                frwrd.innerText = '🚪 ' + rooms[e].title + ' >>';
                frwrd.setAttribute('onClick', `changeRoom(${e})`);
                frwrd.setAttribute('class', 'buttonRoom');
            } else {
                let b = document.createElement('button');
                b.innerText = '🚪 ' + rooms[e].title;
                b.setAttribute('onClick', `changeRoom(${e})`);
                b.setAttribute('class', 'buttonRoom');
                exits.appendChild(b)
            }
            console.log(currentRoom, lastRoom)
        })
        bck ? exits.prepend(bck) : null;
        frwrd ? exits.append(frwrd) : null;
    }

    if (room.events == 0) events.innerHTML = '-';

    room.events.map((e) => {
        let b = document.createElement('button');
        b.innerText = e.title;
        b.setAttribute('onClick', `runEvent(${e.event})`);
        b.id = e.id;
        b.setAttribute('class', 'buttonRoom buttonEvent');
        events.appendChild(b);
    })

    let _roomBtns = document.getElementsByClassName('buttonRoom');
    for (let i = 0; i < _roomBtns.length; i++) {
        let _roomBtn = _roomBtns.item(i);
        try {
            if (_roomBtn.id != 'restartBtn' || _roomBtn.classList.contains('buttonEvent') == false || !(room.roomEvent[0].id == 'die')) 
                _roomBtns.item(i).addEventListener('click', (e) => Events.step());
        } catch (err) {}
    }
}

function changeRoom(index = 0) {
    User.lastRoom = currentRoom;
    lastRoom = currentRoom;
    currentRoom = index;
    User.currentRoom = index;
    saveData();
    render();
}