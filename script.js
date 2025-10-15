const field = document.getElementById('field');
const bench = document.getElementById('bench');
const formationSelect = document.getElementById('formation');

const formations = {
  "4-3-3": [
    [50, 90], // GK
    [15, 70], [35, 70], [65, 70], [85, 70], // DEF
    [25, 50], [50, 45], [75, 50], // MID
    [20, 25], [50, 20], [80, 25] // FWD
  ],
  "4-4-2": [
    [50, 90],
    [15, 70], [35, 70], [65, 70], [85, 70],
    [20, 50], [40, 50], [60, 50], [80, 50],
    [35, 25], [65, 25]
  ],
  "3-5-2": [
    [50, 90],
    [25, 70], [50, 70], [75, 70],
    [15, 50], [35, 50], [50, 45], [65, 50], [85, 50],
    [35, 25], [65, 25]
  ],
  "4-2-3-1": [
    [50, 90],
    [15, 70], [35, 70], [65, 70], [85, 70],
    [35, 55], [65, 55],
    [25, 40], [50, 35], [75, 40],
    [50, 20]
  ],
  "5-3-2": [
    [50, 90],
    [10, 70], [30, 70], [50, 70], [70, 70], [90, 70],
    [30, 50], [50, 45], [70, 50],
    [35, 25], [65, 25]
  ],
  "4-1-4-1": [
    [50, 90],
    [15, 70], [35, 70], [65, 70], [85, 70],
    [50, 55],
    [20, 45], [40, 45], [60, 45], [80, 45],
    [50, 25]
  ]
};

let players = [];

function createPlayers() {
  field.innerHTML = '';
  players = [];

  const selectedFormation = formationSelect.value;
  const positions = formations[selectedFormation];

  positions.forEach((pos, i) => {
    const player = document.createElement('div');
    player.classList.add('player');
    if (i === 0) player.classList.add('goalkeeper');
    player.textContent = `Игрок ${i + 1}`;
    player.style.left = `${pos[0]}%`;
    player.style.top = `${pos[1]}%`;

    player.addEventListener('click', () => {
      const newName = prompt('Введите имя игрока:', player.textContent);
      if (newName) player.textContent = newName;
    });

    field.appendChild(player);
    players.push(player);
  });
}

formationSelect.addEventListener('change', createPlayers);
createPlayers();

// Скамейка запасных
for (let i = 1; i <= 5; i++) {
  const sub = document.createElement('div');
  sub.classList.add('player');
  sub.textContent = `Зап ${i}`;
  bench.appendChild(sub);
}
