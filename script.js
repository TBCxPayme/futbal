document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const formationSelect = document.getElementById('formation');
  const saveBtn = document.getElementById('save');

  // Формы: ключ -> массив позиций [top%, left%] и подпись (по умолчанию позиция)
  const formations = {
    // Несколько вариаций 4-3-3 (в разных ширинах)
    "4-3-3 (классическая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,17], label:'ЛЗ'}, {pos:[68,37], label:'ЦЗ'}, {pos:[68,63], label:'ЦЗ'}, {pos:[68,83], label:'ПЗ'},
      {pos:[48,30], label:'ЛП/ЦП'}, {pos:[48,50], label:'ЦАП'}, {pos:[48,70], label:'ПП/ЦП'},
      {pos:[28,22], label:'ЛФА'}, {pos:[22,50], label:'ЦФ'}, {pos:[28,78], label:'ПФА'}
    ],
    "4-3-3 (широкая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,35], label:'ЦЗ'}, {pos:[68,65], label:'ЦЗ'}, {pos:[68,90], label:'ПЗ'},
      {pos:[48,28], label:'ЛП/ЦП'}, {pos:[48,50], label:'ЦАП'}, {pos:[48,72], label:'ПП/ЦП'},
      {pos:[24,10], label:'ЛФА'}, {pos:[18,50], label:'ЦФ'}, {pos:[24,90], label:'ПФА'}
    ],
    "4-3-3 (узкая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,28], label:'ЛЗ'}, {pos:[68,42], label:'ЦЗ'}, {pos:[68,58], label:'ЦЗ'}, {pos:[68,72], label:'ПЗ'},
      {pos:[50,44], label:'ЛП/ЦП'}, {pos:[46,50], label:'ЦАП'}, {pos:[50,56], label:'ПП/ЦП'},
      {pos:[30,44], label:'ЛФА'}, {pos:[22,50], label:'ЦФ'}, {pos:[30,56], label:'ПФА'}
    ],
    "4-3-3 (атакующая)": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[70,18], label:'ЛЗ'}, {pos:[70,38], label:'ЦЗ'}, {pos:[70,62], label:'ЦЗ'}, {pos:[70,82], label:'ПЗ'},
      {pos:[54,36], label:'ЦП'}, {pos:[46,50], label:'ЦАП'}, {pos:[54,64], label:'ЦП'},
      {pos:[30,26], label:'ЛФА'}, {pos:[22,50], label:'Ложная 9'}, {pos:[30,74], label:'ПФА'}
    ],

    // Другие схемы
    "4-4-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[50,18], label:'ЛП'}, {pos:[50,38], label:'ЦП'}, {pos:[50,62], label:'ЦП'}, {pos:[50,82], label:'ПП'},
      {pos:[30,40], label:'Ф'}, {pos:[30,60], label:'Ф'}
    ],
    "4-2-3-1": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,16], label:'ЛЗ'}, {pos:[68,36], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,84], label:'ПЗ'},
      {pos:[56,44], label:'ОП'}, {pos:[56,56], label:'ОП'},
      {pos:[40,24], label:'ЛАП'}, {pos:[40,50], label:'ЦАП'}, {pos:[40,76], label:'ПАП'},
      {pos:[24,50], label:'Ф'}
    ],
    "3-5-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,30], label:'ЦЗ'}, {pos:[68,50], label:'ЦЗ'}, {pos:[68,70], label:'ЦЗ'},
      {pos:[50,18], label:'ЛП'}, {pos:[50,34], label:'ЦП'}, {pos:[50,50], label:'ОП'}, {pos:[50,66], label:'ЦП'}, {pos:[50,82], label:'ПП'},
      {pos:[30,40], label:'Ф'}, {pos:[30,60], label:'Ф'}
    ],
    "5-3-2": [
      {pos:[85,50], label:'Вратарь'},
      {pos:[68,10], label:'ЛЗ'}, {pos:[68,28], label:'ЦЗ'}, {pos:[68,46], label:'ЦЗ'}, {pos:[68,64], label:'ЦЗ'}, {pos:[68,82], label:'ПЗ'},
      {pos:[50,36], label:'ЦП'}, {pos:[50,50], label:'ОП'}, {pos:[50,64], label:'ЦП'},
      {pos:[30,42], label:'Ф'}, {pos:[30,58], label:'Ф'}
    ]
  };

  // Заполнить выпадающий список
  Object.keys(formations).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    formationSelect.appendChild(opt);
  });

  // Рендер схемы
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
      jersey.textContent = idx === 0 ? '1' : (idx+1); // номер по порядку (по желанию)

      const plate = document.createElement('div');
      plate.className = 'name-plate';
      plate.textContent = p.label;

      // кликабельность: изменить подпись
      plate.addEventListener('click', (e) => {
        e.stopPropagation();
        const newName = prompt('Введите имя / позицию для этой позиции:', plate.textContent);
        if (newName !== null && newName.trim() !== '') plate.textContent = newName.trim();
      });

      // также можно кликать по джерси для смены
      jersey.addEventListener('click', (e) => {
        e.stopPropagation();
        const newName = prompt('Введите имя / позицию для этой позиции:', plate.textContent);
        if (newName !== null && newName.trim() !== '') plate.textContent = newName.trim();
      });

      player.appendChild(jersey);
      player.appendChild(plate);
      field.appendChild(player);
    });
  }

  // Инициализация
  formationSelect.addEventListener('change', () => renderFormation(formationSelect.value));
  renderFormation(formationSelect.value || Object.keys(formations)[0]);

  // Скамейка — переименование
  document.querySelectorAll('.sub').forEach(el => {
    el.addEventListener('click', () => {
      const n = prompt('Введите имя запасного:', el.textContent);
      if (n !== null && n.trim() !== '') el.textContent = n.trim();
    });
  });

  // Сохранение постера как изображение (захватываем весь poster)
  saveBtn.addEventListener('click', () => {
    const poster = document.getElementById('poster');

    // Временно увеличить фон до белого для лучшего результата (не обязательно)
    html2canvas(poster, { scale: 2, useCORS: true }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'poster_lineup.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      alert('Ошибка сохранения изображения: ' + err);
    });
  });
});
