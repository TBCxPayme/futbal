const field = document.getElementById('field');
const bench = document.getElementById('bench');
const formationSelect = document.getElementById('formation');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

const formations = {
  "4-3-3": [[50,90],[15,70],[35,70],[65,70],[85,70],[25,50],[50,45],[75,50],[20,25],[50,20],[80,25]],
  "4-4-2": [[50,90],[15,70],[35,70],[65,70],[85,70],[20,50],[40,50],[60,50],[80,50],[35,25],[65,25]],
  "3-5-2": [[50,90],[25,70],[50,70],[75,70],[15,50],[35,50],[50,45],[65,50],[85,50],[35,25],[65,25]],
  "4-2-3-1": [[50,90],[15,70],[35,70],[65,70],[85,70],[35,55],[65,55],[25,40],[50,35],[75,40],[50,20]],
  "5-3-2": [[50,90],[10,70],[30,70],[50,70],[70,70],[90,70],[30,50],[50,45],[70,50],[35,25],[65,25]],
  "4-1-4-1": [[50,90],[15,70],[35,70],[65,70],[85,70],[50,55],[20,45],[40,45],[60,45],[80,45],[50,25]],
  "3-4-3": [[50,90],[25,70],[50,70],[75,70],[20,50],[40,50],[60,50],[80,50],[20,25],[50,20],[80,25]],
  "4-5-1": [[50,90],[15,70],[35,70],[65,70],[85,70],[20,50],[35,50],[50,45],[65,50],[80,50],[50,25]],
  "3-6-1": [[50,90],[25,70],[50,70],[75,70],[20,55],[35,55],[50,50],[65,55],[80,55],[50,35],[50,20]],
  "4-2-2-2": [[50,90],[15,70],[35,70],[65,70],[85,70],[35,55],[65,55],[35,40],[65,40],[35,25],[65,25]],
  "4-3-1-2": [[50,90],[15,70],[35,70],[65,70],[85,70],[30,55],[50,50],[70,55],[50,40],[35,25],[65,25]],
  "4-2-1-3": [[50,90],[15,70],[35,70],[65,70],[85,70],[35,55],[65,55],[50,45],[25,30],[50,25],[75,30]],
  "5-4-1": [[50,90],[10,70],[30,70],[50,70],[70,70],[90,70],[25,50],[45,50],[65,50],[85,50],[50,25]],
  "3-2-3-2": [[50,90],[30,70],[50,70],[70,70],[40,55],[60,55],[25,45],[50,40],[75,45],[35,25],[65,25]],
  "3-3-1-3": [[50,90],[25,70],[50,70],[75,70],[30,55],[50,55],[70,55],[50,45],[25,25],[50,20],[75,25]],
  "4-6-0": [[50,90],[15,70],[35,70],[65,70],[85,70],[20,55],[35,50],[50,45],[65,50],[80,55],[50,30]]
};

let players = [];
let benchPlayers = [];

// 🧩 Создаём игроков на поле
function createPlayers() {
  for (let i = 0; i < 11; i++) {
    const player = document.createElement('div');
    player.classList.add('player');
    if (i === 0) player.classList.add('goalkeeper');
    player.textContent = `Игрок ${i + 1}`;
    player.addEventListener('click', () => renamePlayer(player));
    field.appendChild(player);
    players.push(player);
  }
  movePlayers();
}

// 🪑 Создаём 9 запасных
function createBench() {
  for (let i = 1; i <= 9; i++) {
    const sub = document.createElement('div');
    sub.classList.add('player');
    sub.textContent = `Зап ${i}`;
    sub.addEventListener('click', () => renamePlayer(sub));
    bench.appendChild(sub);
    benchPlayers.push(sub);
  }
}

// ✏️ Переименование игрока
function renamePlayer(player) {
  const newName = prompt('Введите имя:', player.textContent);
  if (newName) {
    player.textContent = newName;
    saveToLocalStorage();
  }
}

// 🔁 Расстановка игроков
function movePlayers() {
  const selectedFormation = formationSelect.value;
  const positions = formations[selectedFormation];
  players.forEach((player, i) => {
    if (positions[i]) {
      player.style.left = `${positions[i][0]}%`;
      player.style.top = `${positions[i][1]}%`;
    } else {
      player.style.left = `-9999px`;
    }
  });
}

// 💾 Сохранение состава
function saveToLocalStorage() {
  const data = {
    main: players.map(p => p.textContent),
    subs: benchPlayers.map(p => p.textContent),
    formation: formationSelect.value
  };
  localStorage.setItem('teamData', JSON.stringify(data));
  alert('✅ Состав сохранён!');
}

// 🔄 Загрузка состава
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('teamData'));
  if (data) {
    data.main.forEach((name, i) => players[i].textContent = name);
    data.subs.forEach((name, i) => benchPlayers[i].textContent = name);
    formationSelect.value = data.formation;
    movePlayers();
  }
}

// ♻️ Сброс данных
function resetData() {
  if (confirm('Вы уверены, что хотите сбросить состав?')) {
    localStorage.removeItem('teamData');
    location.reload();
  }
}

formationSelect.addEventListener('change', movePlayers);
saveBtn.addEventListener('click', saveToLocalStorage);
resetBtn.addEventListener('click', resetData);

createPlayers();
createBench();
loadFromLocalStorage();
