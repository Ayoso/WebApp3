const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Замените на ваш URL

// Получаем элементы DOM
const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.querySelector('.get-signal-button');

let loadingFinished = false; // Флаг для отслеживания завершения загрузки

// Функция для обновления данных коэффициентов
function updateData(coefficients) {
    if (coefficients) {
        const coefficient1 = coefficients.coefficient1.toFixed(2);
        const coefficient2 = coefficients.coefficient2.toFixed(2);

        // Создаем HTML для коэффициентов
        const coefficientsHTML = `
            <div class="coefficient">${coefficient1}X</div>
            <div class="coefficient"> - ${coefficient2}X</div>
        `;

        // Вставляем HTML в coefficientsContainer
        coefficientsContainer.innerHTML = coefficientsHTML;

        const time = new Date().toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${time}`;
        chanceContainer.textContent = `Chance: ${chance}`;
    }
}

// Функция для получения коэффициентов с сервера
function fetchCoefficients() {
    fetch(`${webAppUrl}/get-coefficients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            updateData(data);
            loadingFinished = true;
            loaderBar.style.animation = 'none'; // Отключаем анимацию загрузки

            // Запускаем обновление коэффициентов после 25 секунд загрузки
            setTimeout(() => {
                loaderBar.style.animation = 'loadAnimation 60s linear infinite'; // Включаем анимацию загрузки
                fetchCoefficients();
            }, 25000);

        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
        });
}

// Функция для генерации случайных коэффициентов
function generateRandomCoefficients() {
    const coefficient1 = (Math.random() * 5 + 1).toFixed(2); // Генерируем случайное число от 1 до 6 с двумя знаками после запятой
    const coefficient2 = (coefficient1 * (Math.floor(Math.random() * 3) + 2)).toFixed(2); // Второй коэффициент в два или больше раза больше первого
    return { coefficient1: parseFloat(coefficient1), coefficient2: parseFloat(coefficient2) };
}

// Обработчик для кнопки "GET SIGNAL"
getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'loadAnimation 25s linear'; // Включаем анимацию загрузки

        // Запускаем обновление коэффициентов после 25 секунд загрузки
        setTimeout(() => {
            fetchCoefficients();
        }, 25000);
    }
});

// Инициализация данных при загрузке страницы
fetchCoefficients();
