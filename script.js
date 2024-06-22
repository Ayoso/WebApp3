const webAppUrl = 'http://localhost:3002';

const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const goToGameButton = document.getElementById('goToGameButton');
const airplane = document.querySelector('.airplane');

let loadingFinished = true;

function updateTime() {
    const currentTime = new Date();
    const currentTimeString = currentTime.toLocaleTimeString();
    timeContainer.textContent = `Time: ${currentTimeString}`;
}

// Обновляем время каждую секунду
setInterval(updateTime, 1000);

// Обновляем время сразу при загрузке страницы
updateTime();

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

        const chance = `${Math.floor(Math.random() * 21) + 70}%`;
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
                loaderBar.style.animation = 'none';
                loaderBar.style.width = '0';
                airplane.style.animation = 'none';
                void airplane.offsetWidth;
                airplane.style.animation = 'airplaneFly 10s linear infinite';
                loadingFinished = true;
            }, 10000);
        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
            loadingFinished = true;
        });
}

getSignalButton.addEventListener('click', () => {
    console.log('Кнопка GET SIGNAL нажата');
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'none';
        void loaderBar.offsetWidth;
        loaderBar.style.animation = 'loadAnimation 10s linear';
        fetchCoefficients();
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://example.com/game';
});
