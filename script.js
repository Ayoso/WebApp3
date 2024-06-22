const webAppUrl = 'https://web-app3-60pmpbo6a-ayosos-projects.vercel.app';

const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const beforeSignalContainer = document.getElementById('beforeSignalContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const goToGameButton = document.getElementById('goToGameButton');
const airplane = document.querySelector('.airplane');

let loadingFinished = true;

function updateData(coefficients) {
    console.log('Обновление данgit add .ных:', coefficients);
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

        // Обновление времени до следующего сигнала
        const nextSignalTime = new Date(currentTime.getTime() + 60000); // Следующий сигнал через 1 минуту
        const timeDifference = nextSignalTime - currentTime;
        const minutes = Math.floor(timeDifference / 60000);
        const seconds = ((timeDifference % 60000) / 1000).toFixed(0);
        beforeSignalContainer.textContent = `Before the signal: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
