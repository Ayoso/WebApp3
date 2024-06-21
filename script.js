const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Замените на ваш URL

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');

function updateData() {
    const coefficient1 = (Math.random() * 4.5 + 2).toFixed(2);
    const coefficient2 = (Math.random() * 4.5 + 2).toFixed(2);
    const time = new Date().toLocaleTimeString();
    const chance = `${Math.floor(Math.random() * 21) + 70}%`;

    coefficientsContainer.textContent = `${coefficient1}X - ${coefficient2}X`;
    timeContainer.textContent = `Time: ${time}`;
    chanceContainer.textContent = `Chance: ${chance}`;
}

function updateCoefficients() {
    setTimeout(updateData, 60000); // Ждем 60 секунд перед обновлением коэффициентов
}

// Отслеживаем завершение анимации загрузки
loaderBar.addEventListener('animationend', updateCoefficients);

// Обновляем данные каждые 5 секунд
setInterval(updateData, 5000);

// Инициализация данных при загрузке страницы
updateData();
