// Получаем ссылки на элементы
const loader = document.getElementById('loader');
const content = document.getElementById('content');

// Функция для скрытия прелоадера и показа контента
function showContent() {
  loader.style.display = 'none';
  content.style.display = 'block';
}

// Вызываем функцию после загрузки страницы
window.addEventListener('load', showContent);
