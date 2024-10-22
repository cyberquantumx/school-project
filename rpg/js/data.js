const changeLogURL = 'https://t.me/changelogrpg0000',
    gameVersion = '0.2.1';

const debug = false;


let rooms = [{
        "title": "Комната в общаге",
        "description": "Черт, опять я тут...",
        "img": "room0.png",
        "id": 0,
        "exits": [
            1
        ],
        "events": [{
            "title": "👀 Посмотреть в окно",
            "event": "LookWindow()",
            "id": "lookwindow"
        }]
    },
    {
        "title": "Коридор",
        "description": "Пути неисповедимы",
        "img": "room1.png",
        "id": 1,
        "exits": [
            0, 2, 4
        ],
        "events": []
    },
    {
        "title": "Туалет",
        "description": "Вонючая комната",
        "img": "room2.png",
        "id": 2,
        "exits": [
            1, 3
        ],
        "events": []
    },
    {
        "title": "Окно в туалете",
        "description": "Упс.. Ты мертв..",
        "img": "room3.png",
        "id": 3,
        "exits": [],
        "events": [],
        "roomEvent": [{
            "event": "die()",
            "id": "die"
        }]
    },
    {
        "title": "Столовая",
        "description": "Ммм.. булочки!",
        "img": "room4.png",
        "id": 4,
        "exits": [1],
        "events": []
    }
];