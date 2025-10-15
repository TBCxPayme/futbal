document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("field");
  const formationSelect = document.getElementById("formation");

  // ✅ Добавляем несколько вариаций 4-3-3
  const formations = {
    "4-3-3 (классическая)": [
      { pos: [90, 50], name: "Вратарь" },
      { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
      { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
      { pos: [50, 30], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" }, { pos: [50, 70], name: "ЦП" },
      { pos: [30, 25], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 75], name: "ПФА" }
    ],
    "4-3-3 (широкая)": [
      { pos: [90, 50], name: "Вратарь" },
      { pos: [70, 15], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
      { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 85], name: "ПЗ" },
      { pos: [50, 35], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" }, { pos: [50, 65], name: "ЦП" },
      { pos: [30, 10], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 90], name: "ПФА" }
    ],
    "4-3-3 (узкая)": [
      { pos: [90, 50], name: "Вратарь" },
      { pos: [70, 25], name: "ЛЗ" }, { pos: [70, 45], name: "ЦЗ" },
      { pos: [70, 55], name: "ЦЗ" }, { pos: [70, 75], name: "ПЗ" },
      { pos: [50, 45], name: "ЦОП" }, { pos: [45, 50], name: "ЦП" }, { pos: [50, 55], name: "ЦОП" },
      { pos: [30, 40], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 60], name: "ПФА" }
    ],
    "4-3-3 (атакующая)": [
      { pos: [90, 50], name: "Вратарь" },
      { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
      { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
      { pos: [55, 40], name: "ЦП" }, { pos: [55, 60], name: "ЦП" }, { pos: [45, 50], name: "ЦАП" },
      { pos: [30, 20], name: "ЛФА" }, { pos: [25, 50], name: "ЦФ" }, { pos: [30, 80], name: "ПФА" }
    ],
    "4-3-3 (с ложной 9)": [
      { pos: [90, 50], name: "Вратарь" },
      { pos: [70, 20], name: "ЛЗ" }, { pos: [70, 40], name: "ЦЗ" },
      { pos: [70, 60], name: "ЦЗ" }, { pos: [70, 80], name: "ПЗ" },
      { pos: [55, 35], name: "ЦП" }, { pos: [55, 65], name: "ЦП" }, { pos: [50, 50], name: "ЦОП" },
      { pos: [35, 25], name: "ЛФА" }, { pos: [35, 75], name: "ПФА" }, { pos: [40, 50], name: "Ложная 9" }
    ],

    // Оставляем старые схемы тоже
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
    ]
  };

  // Автоматически заполняем выпадающий список схем
  Object.keys(formations).forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    formationSelect.appendChild(opt);
  });

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

  formationSelect.addEventListener('change', e => renderFormation(e.target.value));
  renderFormation(formationSelect.value);

  // Возможность переименовать запасных
  document.querySelectorAll('.sub').forEach(sub => {
    sub.addEventListener('click', () => {
      const newName = prompt('Введите новое имя игрока:', sub.textContent);
      if (newName && newName.trim() !== '') sub.textContent = newName.trim();
    });
  });
});
