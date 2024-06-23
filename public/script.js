const webAppUrl = 'https://web-app3-60pmpb06a-ayosos-projects.vercel.app'; // Замените на ваш URL

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const goToGameButton = document.getElementById('goToGameButton');

let loadingFinished = true; // Устанавливаем начальное значение в true

function updateData(coefficients) {
    if (coefficients) {
        const coefficient1 = parseFloat(coefficients.coefficient1).toFixed(2);
        const coefficient2 = parseFloat(coefficients.coefficient2).toFixed(2);

        coefficientsContainer.innerHTML = `
            <div class="coefficient">${coefficient1}X</div>
            <div class="coefficient">- ${coefficient2}X</div>
        `;

        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + 25000);
        const currentTimeString = currentTime.toLocaleTimeString();
        const endTimeString = endTime.toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${currentTimeString} - ${endTimeString}`;
        chanceContainer.textContent = `Chance: ${chance}`;
    }
}

async function fetchCoefficients() {
    try {
        const response = await fetch(`${webAppUrl}/get-coefficients`, {
            method: 'GET', // Измените метод на GET
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors' // Добавление режима cors
        });
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const data = await response.json();
        updateData(data);
        loadingFinished = true;
        loaderBar.style.animation = 'none'; // Останавливаем анимацию после получения данных
        loaderBar.style.width = '0'; // Сбрасываем ширину ползунка
    } catch (error) {
        console.error('Ошибка при получении коэффициентов:', error);
    }
}

function startLoadingAnimation() {
    loaderBar.style.animation = 'loadAnimation 25s linear'; // Запускаем анимацию загрузки
}

getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        startLoadingAnimation();
        setTimeout(() => {
            fetchCoefficients().catch(error => console.error(error)); // Обрабатываем обещание
        }, 25000);
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://web-app3-60pmpb06a-ayosos-projects.vercel.app'; // Замените на URL вашей игры
});