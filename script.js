document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("field");
  const select = document.getElementById("formation");
  const saveBtn = document.getElementById("save");

  const formations = {
    "4-3-3": [
      [90, 50], [70, 20], [70, 40], [70, 60], [70, 80],
      [50, 30], [50, 50], [50, 70],
      [30, 25], [25, 50], [30, 75]
    ],
    "4-2-3-1": [
      [90, 50], [70, 20], [70, 40], [70, 60], [70, 80],
      [55, 40], [55, 60],
      [40, 25], [40, 50], [40, 75],
      [25, 50]
    ],
    "4-4-2": [
      [90, 50], [70, 20], [70, 40], [70, 60], [70, 80],
      [50, 20], [50, 40], [50, 60], [50, 80],
      [30, 40], [30, 60]
    ],
    "3-5-2": [
      [90, 50], [70, 30], [70, 50], [70, 70],
      [50, 20], [50, 35], [50, 50], [50, 65], [50, 80],
      [30, 40], [30, 60]
    ],
    "5-3-2": [
      [90, 50], [70, 15], [70, 35], [70, 50], [70, 65], [70, 85],
      [50, 35], [50, 50], [50, 65],
      [30, 40], [30, 60]
    ],
    "4-1-4-1": [
      [90, 50], [70, 20], [70, 40], [70, 60], [70, 80],
      [55, 50],
      [45, 20], [45, 40], [45, 60], [45, 80],
      [25, 50]
    ]
  };

  function renderFormation(name) {
    field.innerHTML = '';
    const formation = formations[name];
    formation.forEach((pos, i) => {
      const div = document.createElement('div');
      div.className = 'player';
      div.style.top = pos[0] + '%';
      div.style.left = pos[1] + '%';
      div.textContent = 'Игрок ' + (i + 1);
      div.addEventListener('click', () => {
        const newName = prompt('Введите имя игрока:', div.textContent);
        if (newName && newName.trim() !== '') div.textContent = newName.trim();
      });
      field.appendChild(div);
    });
  }

  select.addEventListener('change', () => renderFormation(select.value));
  renderFormation(select.value);

  // Переименование запасных
  document.querySelectorAll('.sub').forEach(sub => {
    sub.addEventListener('click', () => {
      const newName = prompt('Введите имя игрока:', sub.textContent);
      if (newName && newName.trim() !== '') sub.textContent = newName.trim();
    });
  });

  // Сохранение как изображение
  saveBtn.addEventListener('click', () => {
    html2canvas(field).then(canvas => {
      const link = document.createElement('a');
      link.download = 'состав_команды.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
});
