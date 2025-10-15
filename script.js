// Позволяет изменять имена игроков по клику
document.querySelectorAll('.player, .sub').forEach(el => {
  el.addEventListener('click', () => {
    const newName = prompt('Введите новое имя игрока:', el.textContent);
    if (newName !== null && newName.trim() !== '') {
      el.textContent = newName.trim();
    }
  });
});
