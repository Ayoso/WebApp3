const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Использование локального прокси

const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const goToGameButton = document.getElementById('goToGameButton');
const airplane = document.querySelector('.airplane'); // Добавляем самолёт

let loadingFinished = true; // Глобальная переменная для отслеживания состояния загрузки

function updateData(coefficients) {
    console.log('Обновление данных:', coefficients);
    if (coefficients) {
        const coefficient1 = parseFloat(coefficients.coefficient1).toFixed(2);
        const coefficient2 = parseFloat(coefficients.coefficient2).toFixed(2);

        console.log('Коэффициенты:', coefficient1, coefficient2);

        const coefficient1Element = document.getElementById('coefficient1');
        const coefficient2Element = document.getElementById('coefficient2');

        if (coefficient1Element && coefficient2Element) {
            coefficient1Element.textContent = `${coefficient1}X`;
            coefficient2Element.textContent = `- ${coefficient2}X`;
        } else {
            console.error('Элементы для отображения коэффициентов не найдены');
        }

        const currentTime = new Date();
        const currentTimeString = currentTime.toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${currentTimeString}`;
        chanceContainer.textContent = `Chance: ${chance}`;
    } else {
        console.error('Коэффициенты не получены');
    }
}

function fetchCoefficients() {
    console.log('Запрос коэффициентов...');
    fetch(`${webAppUrl}/get-coefficients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Коэффициенты получены:', data);
            setTimeout(() => {
                updateData(data);
                loaderBar.style.animation = 'none'; // Остановить анимацию после получения данных
                loaderBar.style.width = '0'; // Сбросить ширину загрузчика
                airplane.style.animation = 'none'; // Остановить анимацию самолета после получения данных
                void airplane.offsetWidth; // Запустить перерисовку
                airplane.style.animation = 'airplaneAnimation 10s linear'; // Перезапустить анимацию самолета
                loadingFinished = true;
            }, 10000); // Задержка 10 секунд для завершения анимации
        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
            loadingFinished = true; // Сбросить состояние загрузки в случае ошибки
        });
}

getSignalButton.addEventListener('click', () => {
    console.log('Кнопка GET SIGNAL нажата');
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'none'; // Остановить текущую анимацию
        void loaderBar.offsetWidth; // Триггер перерисовки
        loaderBar.style.animation = 'loadAnimation 10s linear'; // Перезапустить анимацию загрузки
        fetchCoefficients();
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://example.com/game'; // Убедитесь, что URL правильный
});
