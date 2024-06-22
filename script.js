const webAppUrl = 'https://web-app3-three.vercel.app'; // Замените на ваш URL

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

        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + 25000);
        const currentTimeString = currentTime.toLocaleTimeString();
        const endTimeString = endTime.toLocaleTimeString();
        const chance = `${Math.floor(Math.random() * 21) + 70}%`;

        timeContainer.textContent = `Time: ${currentTimeString} - ${endTimeString}`;
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
            loaderBar.style.width = '0'; // Сбрасываем ширину ползунка
        })
        .catch(error => {
            console.error('Ошибка при получении коэффициентов:', error);
        });
}

getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'loadAnimation 25s linear'; // Запускаем анимацию загрузки
        setTimeout(() => {
            fetchCoefficients(); // Получаем новые коэффициенты через 25 секунд
        }, 25000);
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://web-app3-three.vercel.app'; // Замените на URL вашей игры
});
