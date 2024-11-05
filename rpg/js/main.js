const root = document.getElementById('root');

function initBaseInfo() {
    let _divGameInfo = document.createElement('div');

    _divGameInfo.className = 'gameInfo';

    let _changelog = document.createElement('a');
    _changelog.target = '_blank';
    _changelog.rel = 'noopener noreferrer';
    _changelog.href = changeLogURL;
    _changelog.innerText = '';

    let _gameVer = document.createElement('p');
    _gameVer.innerText = 'v ' + gameVersion;

    let _gameAuthor = document.createElement('p');
    _gameAuthor.innerText = 'Автор: Ирхин Илья (ИВТ)';

    _divGameInfo.append(_changelog, _gameVer, _gameAuthor);
    root.append(_divGameInfo);

    console.log(initBaseInfo.name + ' success')
}

async function init() {
    await initBaseInfo();

    localStorage.setItem('v', gameVersion);
}

function reload() {
    window.location.reload();
}

window.onload = async () => {
    console.time('load');
    await init();
    await render();
    await initDebug();
    await loadUser();
    console.timeLog('load');
};