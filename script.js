const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Замените на ваш URL

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');

function updateData() {
    const coefficient1 = (Math.random() * 4.5 + 2).toFixed(2);
    const coefficient2 = (Math.random() * 4.5 + 2).toFixed(2);
    const time = new Date().toLocaleTimeString();
    const chance = `${Math.floor(Math.random() * 21) + 70}%`;

    coefficientsContainer.textContent = `${coefficient1}X - ${coefficient2}X`;
    timeContainer.textContent = `Time: ${time}`;
    chanceContainer.textContent = `Chance: ${chance}`;
}

// Обновляем данные каждые 5 секунд
setInterval(updateData, 5000);

// Инициализация данных при загрузке страницы
updateData();
