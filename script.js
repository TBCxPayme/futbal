document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const formationSelect = document.getElementById('formation');
  const saveBtn = document.getElementById('save');

  // --- СХЕМЫ --- //
  const formations = {
    // ⚽ Классические 4-3-3
    "4-3-3 (классическая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,17], label:'ЛЗ'}, {pos:[68,37], label:'ЦЗ'}, {pos:[68,63], label:'ЦЗ'}, {pos:[68,83], label:'ПЗ'},
      {pos:[48,30], label:'ЛП'}, {pos:[48,50], label:'ЦП'}, {pos:[48,70], label:'ПП'},
      {pos:[28,22], label:'ЛФА'}, {pos:[22,50], label:'ЦФ'}, {pos:[28,78], label:'ПФА'}
    ],
    "4-3-3 (широкая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,35], label:'ЦЗ'}, {pos:[68,65], label:'ЦЗ'}, {pos:[68,90], label:'ПЗ'},
      {pos:[48,28], label:'ЛП'}, {pos:[48,50], label:'ЦАП'}, {pos:[48,72], label:'ПП'},
      {pos:[24,10], label:'ЛФА'}, {pos:[18,50], label:'ЦФ'}, {pos:[24,90], label:'ПФА'}
    ],
    "4-3-3 (узкая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,28], label:'ЛЗ'}, {pos:[68,42], label:'ЦЗ'}, {pos:[68,58], label:'ЦЗ'}, {pos:[68,72], label:'ПЗ'},
      {pos:[50,44], label:'ЦП'}, {pos:[46,50], label:'ОП'}, {pos:[50,56], label:'ЦП'},
      {pos:[30,44], label:'ЛФА'}, {pos:[22,50], label:'ЦФ'}, {pos:[30,56], label:'ПФА'}
    ],
    "4-3-3 (атакующая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[70,18], label:'ЛЗ'}, {pos:[70,38], label:'ЦЗ'}, {pos:[70,62], label:'ЦЗ'}, {pos:[70,82], label:'ПЗ'},
      {pos:[54,36], label:'ЦП'}, {pos:[46,50], label:'ЦАП'}, {pos:[54,64], label:'ЦП'},
      {pos:[30,26], label:'ЛФА'}, {pos:[22,50], label:'ЦФ'}, {pos:[30,74], label:'ПФА'}
    ],
    "4-3-3 (оборонительная)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[72,18], label:'ЛЗ'}, {pos:[72,38], label:'ЦЗ'}, {pos:[72,62], label:'ЦЗ'}, {pos:[72,82], label:'ПЗ'},
      {pos:[56,32], label:'ОП'}, {pos:[56,50], label:'ОП'}, {pos:[56,68], label:'ОП'},
      {pos:[38,26], label:'ЛФА'}, {pos:[32,50], label:'ЦФ'}, {pos:[38,74], label:'ПФА'}
    ],

    // 🧩 4-4-2 вариации
    "4-4-2 (классическая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[50,18], label:'ЛП'}, {pos:[50,38], label:'ЦП'}, {pos:[50,62], label:'ЦП'}, {pos:[50,82], label:'ПП'},
      {pos:[30,40], label:'Ф'}, {pos:[30,60], label:'Ф'}
    ],
    "4-4-2 (ромб)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[54,30], label:'ЦП'}, {pos:[46,50], label:'ЦАП'}, {pos:[54,70], label:'ЦП'}, {pos:[60,50], label:'ОП'},
      {pos:[30,40], label:'Ф'}, {pos:[30,60], label:'Ф'}
    ],

    // 🧠 Современные
    "4-2-3-1": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[56,44], label:'ОП'}, {pos:[56,56], label:'ОП'},
      {pos:[40,24], label:'ЛАП'}, {pos:[40,50], label:'ЦАП'}, {pos:[40,76], label:'ПАП'},
      {pos:[24,50], label:'Ф'}
    ],
    "4-5-1": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[54,20], label:'ЛП'}, {pos:[54,35], label:'ЦП'}, {pos:[54,50], label:'ОП'}, {pos:[54,65], label:'ЦП'}, {pos:[54,80], label:'ПП'},
      {pos:[28,50], label:'Ф'}
    ],

    // 🧱 С 3 защитниками
    "3-5-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'},
      {pos:[50,18], label:'ЛП'}, {pos:[50,34], label:'ЦП'}, {pos:[50,50], label:'ОП'}, {pos:[50,66], label:'ЦП'}, {pos:[50,82], label:'ПП'},
      {pos:[30,40], label:'Ф'}, {pos:[30,60], label:'Ф'}
    ],
    "3-4-3": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'},
      {pos:[52,28], label:'ЛП'}, {pos:[52,72], label:'ПП'}, {pos:[48,45], label:'ЦП'}, {pos:[48,55], label:'ЦП'},
      {pos:[30,28], label:'ЛФА'}, {pos:[24,50], label:'ЦФ'}, {pos:[30,72], label:'ПФА'}
    ],
    "3-4-1-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'},
      {pos:[52,28], label:'ЛП'}, {pos:[52,72], label:'ПП'}, {pos:[52,45], label:'ЦП'}, {pos:[52,55], label:'ЦП'},
      {pos:[40,50], label:'ЦАП'},
      {pos:[26,40], label:'Ф'}, {pos:[26,60], label:'Ф'}
    ],

    // 🧱 5 защитников
    "5-3-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,28], label:'ЦЗ'}, {pos:[68,46], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,82], label:'ПЗ'},
      {pos:[50,36], label:'ЦП'}, {pos:[50,50], label:'ОП'}, {pos:[50,64], label:'ЦП'},
      {pos:[30,42], label:'Ф'}, {pos:[30,58], label:'Ф'}
    ],
    "5-2-3": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'}, {pos:[68,90], label:'ПЗ'},
      {pos:[50,40], label:'ОП'}, {pos:[50,60], label:'ОП'},
      {pos:[32,26], label:'ЛФА'}, {pos:[26,50], label:'ЦФ'}, {pos:[32,74], label:'ПФА'}
    ],
    "5-3-1-1": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'}, {pos:[68,90], label:'ПЗ'},
      {pos:[50,36], label:'ЦП'}, {pos:[50,50], label:'ОП'}, {pos:[50,64], label:'ЦП'},
      {pos:[36,50], label:'ЦАП'}, {pos:[24,50], label:'Ф'}
    ],

    // Экзотика 😎
    "3-2-2-3 (WM)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'},
      {pos:[58,38], label:'ОП'}, {pos:[58,62], label:'ОП'},
      {pos:[46,38], label:'ЦП'}, {pos:[46,62], label:'ЦП'},
      {pos:[30,20], label:'ЛФА'}, {pos:[26,50], label:'ЦФ'}, {pos:[30,80], label:'ПФА'}
    ]
  };

  // --- Инициализация --- //
  Object.keys(formations).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    formationSelect.appendChild(opt);
  });

  function renderFormation(name) {
    field.innerHTML = '';
    const arr = formations[name];
    arr.forEach((p, idx) => {
      const player = document.createElement('div');
      player.className = 'player';
      player.style.top = p.pos[0] + '%';
      player.style.left = p.pos[1] + '%';

      const jersey = document.createElement('div');
      jersey.className = 'jersey';
      jersey.textContent = idx + 1;

      const plate = document.createElement('div');
      plate.className = 'name-plate';
      plate.textContent = p.label;

      jersey.addEventListener('click', () => {
        const newName = prompt('Введите имя или позицию:', plate.textContent);
        if (newName && newName.trim() !== '') plate.textContent = newName.trim();
      });
      plate.addEventListener('click', () => {
        const newName = prompt('Введите имя или позицию:', plate.textContent);
        if (newName && newName.trim() !== '') plate.textContent = newName.trim();
      });

      player.appendChild(jersey);
      player.appendChild(plate);
      field.appendChild(player);
    });
  }

  formationSelect.addEventListener('change', () => renderFormation(formationSelect.value));
  renderFormation(Object.keys(formations)[0]);

  // --- Скамейка --- //
  document.querySelectorAll('.sub').forEach(el => {
    el.addEventListener('click', () => {
      const n = prompt('Введите имя запасного:', el.textContent);
      if (n && n.trim() !== '') el.textContent = n.trim();
    });
  });

  // --- Сохранение постера --- //
  saveBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('poster'), { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'lineup_poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
});
