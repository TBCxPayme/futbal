const field = document.getElementById('field');
const formationSelect = document.getElementById('formation');

// Расположение игроков для разных схем (в процентах)
const formations = {
  "4-3-3": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
    { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
    { pos: [50, 30], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" }, { pos: [50, 70], name: "ЦП" },
    { pos: [30, 25], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 75], name: "ПФА" }
  ],
  "4-4-2": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
    { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
    { pos: [50, 20], name: "ЛП" }, { pos: [50, 40], name: "ЦП" },
    { pos: [50, 60], name: "ЦП" }, { pos: [50, 80], name: "ПП" },
    { pos: [30, 40], name: "Ф" }, { pos: [30, 60], name: "Ф" }
  ],
  "3-5-2": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 30], name: "ЦЗ" }, { pos: [70, 50], name: "ЦЗ" }, { pos: [70, 70], name: "ЦЗ" },
    { pos: [55, 20], name: "ЛП" }, { pos: [55, 80], name: "ПП" },
    { pos: [50, 35], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" }, { pos: [50, 65], name: "ЦП" },
    { pos: [30, 40], name: "Ф" }, { pos: [30, 60], name: "Ф" }
  ],
  "4-2-3-1": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
    { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
    { pos: [55, 40], name: "ЦОП" }, { pos: [55, 60], name: "ЦОП" },
    { pos: [40, 25], name: "ЛАП" }, { pos: [40, 50], name: "ЦАП" }, { pos: [40, 75], name: "ПАП" },
    { pos: [25, 50], name: "Ф" }
  ],
  "5-3-2": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 15], name: "ЛЗ" }, { pos: [70, 35], name: "ЦЗ" },
    { pos: [70, 50], name: "ЦЗ" }, { pos: [70, 65], name: "ЦЗ" }, { pos: [70, 85], name: "ПЗ" },
    { pos: [50, 35], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" }, { pos: [50, 65], name: "ЦП" },
    { pos: [30, 40], name: "Ф" }, { pos: [30, 60], name: "Ф" }
  ],
  "3-4-3": [
    { pos: [90, 50], name: "Вратарь" },
    { pos: [70, 30], name: "ЦЗ" }, { pos: [70, 50], name: "ЦЗ" }, { pos: [70, 70], name: "ЦЗ" },
    { pos: [50, 20], name: "ЛП" }, { pos: [50, 40], name: "ЦП" },
    { pos: [50, 60], name: "ЦП" }, { pos: [50, 80], name: "ПП" },
    { pos: [30, 25], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 75], name: "ПФА" }
  ]
};

// Функция отрисовки игроков
function renderFormation(name) {
  field.innerHTML = '';
  const formation = formations[name];

  formation.forEach(player => {
    const el = document.createElement('div');
    el.className = 'player';
    el.style.top = player.pos[0] + '%';
    el.style.left = player.pos[1] + '%';
    el.textContent = player.name;
    el.addEventListener('click', () => {
      const newName = prompt('Введите новое имя игрока:', el.textContent);
      if (newName && newName.trim() !== '') el.textContent = newName.trim();
    });
    field.appendChild(el);
  });
}

// Инициализация
formationSelect.addEventListener('change', e => renderFormation(e.target.value));
renderFormation(formationSelect.value);

// Возможность менять имена запасных
document.querySelectorAll('.sub').forEach(sub => {
  sub.addEventListener('click', () => {
    const newName = prompt('Введите новое имя игрока:', sub.textContent);
    if (newName && newName.trim() !== '') sub.textContent = newName.trim();
  });
});
