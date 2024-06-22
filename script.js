const webAppUrl = 'https://web-app3-three.vercel.app'; // Убедитесь, что этот URL правильный

const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const airplane = document.querySelector('.airplane'); // Добавляем самолёт

let loadingFinished = true; // Начальное значение true

function updateData(coefficients) {
    if (coefficients) {
        const coefficient1 = parseFloat(coefficients.coefficient1).toFixed(2);
        const coefficient2 = parseFloat(coefficients.coefficient2).toFixed(2);

        document.getElementById('coefficient1').textContent = `${coefficient1}X`;
        document.getElementById('coefficient2').textContent = `- ${coefficient2}X`;

        const currentTime = new Date();
        const currentTimeString = currentTime.toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${currentTimeString}`;
        chanceContainer.textContent = `Chance: ${chance}`;
    }
}

function fetchCoefficients() {
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
            updateData(data);
            loadingFinished = true;
            loaderBar.style.animation = 'none'; // Остановить анимацию после получения данных
            loaderBar.style.width = '0'; // Сбросить ширину загрузчика
            airplane.style.animation = 'none'; // Остановить анимацию самолета после получения данных
            void airplane.offsetWidth; // Запустить перерисовку
            airplane.style.animation = 'airplaneAnimation 10s linear'; // Перезапустить анимацию самолета
        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
        });
}

getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'loaderAnimation 10s linear'; // Запустить анимацию загрузки
        fetchCoefficients();
    }
});
