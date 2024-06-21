const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.querySelector('.get-signal-button');

let loadingFinished = false; // Флаг для отслеживания завершения загрузки

function updateData() {
    if (loadingFinished) {
        const coefficient1 = (Math.random() * 4.5 + 2).toFixed(2);
        const coefficient2 = coefficient1 * (Math.floor(Math.random() * 3) + 2); // Второй коэффициент в возврастающей прогрессии

        const time = new Date().toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        coefficientsContainer.textContent = `${coefficient1}X - ${coefficient2}X`;
        timeContainer.textContent = `Time: ${time}`;
        chanceContainer.textContent = `Chance: ${chance}`;
    }
}

function updateCoefficients() {
    setTimeout(() => {
        loadingFinished = true;
        loaderBar.style.animation = 'none'; // Отключаем анимацию загрузки
        updateData(); // Обновляем коэффициенты после завершения загрузки
    }, 25000); // Загрузка длится 25 секунд
}

// Отслеживаем завершение анимации загрузки
loaderBar.addEventListener('animationend', () => {
    updateCoefficients();
});

// Обработчик для кнопки "GET SIGNAL"
getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'loadAnimation 25s linear infinite'; // Включаем анимацию загрузки
        setTimeout(() => {
            updateCoefficients(); // Запускаем обновление коэффициентов после 25 секунд загрузки
        }, 25000);
    }
});

// Обновляем данные каждые 5 секунд
setInterval(() => {
    updateData();
}, 5000);

// Инициализация данных при загрузке страницы
updateData();
