const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Замените на ваш URL

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.querySelector('.get-signal-button');
const goToGameButton = document.querySelector('.go-to-game-button');

let loadingFinished = true; // Устанавливаем начальное значение в true

function updateData(coefficients) {
    if (coefficients) {
        const coefficient1 = coefficients.coefficient1.toFixed(2);
        const coefficient2 = coefficients.coefficient2.toFixed(2);

        const coefficientsHTML = `
            <div class="coefficient">${coefficient1}X</div>
            <div class="coefficient">- ${coefficient2}X</div>
        `;
        coefficientsContainer.innerHTML = coefficientsHTML;

        const time = new Date().toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${time}`;
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
        .then(response => response.json())
        .then(data => {
            updateData(data);
            loadingFinished = true;
            loaderBar.style.animation = 'none'; // Останавливаем анимацию после получения данных

        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
        });
}

getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'loadпAnimation 25s linear'; // Запускаем анимацию загрузки
        setTimeout(() => {
            fetchCoefficients(); // Получаем новые коэффициенты через 25 секунд
        }, 25000);
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://your-game-url.com'; // Замените на URL вашей игры
});
