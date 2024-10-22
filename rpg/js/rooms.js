const exits = document.getElementById('buttonsRoom');
const events = document.getElementById('buttonsRoomEvents');

let lastRoom = '-1',
    currentRoom = 0;

async function render() {
    updateProfile(User)
    let room = rooms[currentRoom];

    document.getElementById('title').innerText = room.title;
    document.getElementById('description').innerText = room.description;
    document.getElementById('roomImage').src = 'img/rooms/' + room.img;
    if (room.roomEvent) new Function(room.roomEvent[0].event)();

    exits.innerHTML = '';
    events.innerHTML = '';

    if (room.exits == 0) {
        let b = document.createElement('button');
        b.innerText = 'Начать заново';
        b.setAttribute('onClick', 'respawn()');
        b.setAttribute('class', 'buttonRoom');
        exits.appendChild(b);
    } else {
        let bck, frwrd;
        room.exits.map((e) => {
            //back = (lastRoom == e && currentRoom != 0 && lastRoom < currentRoom)
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

    if (room.events == 0) {
        events.innerHTML = '-'
    }

    room.events.map((e) => {
        let b = document.createElement('button');
        b.innerText = e.title
        b.setAttribute('onClick', e.event);
        b.setAttribute('class', 'buttonRoom buttonEvent');
        events.appendChild(b);
    })
}

function changeRoom(index = 0) {
    lastRoom = currentRoom;
    currentRoom = index;
    render();
}