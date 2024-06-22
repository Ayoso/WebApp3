const webAppUrl = 'http://localhost:3002'; // Измените на публичный URL-адрес вашего сервера, если он развернут

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');
const airplane = document.querySelector('.airplane'); // Добавляем самолёт

let loadingFinished = true; // Initial value set to true

function updateData(coefficients) {
    if (coefficients) {
        let coefficient1 = parseFloat(coefficients.coefficient1).toFixed(2);
        let coefficient2 = parseFloat(coefficients.coefficient2).toFixed(2);

        while (parseFloat(coefficient1) >= parseFloat(coefficient2) || parseFloat(coefficient2) - parseFloat(coefficient1) < 2) {
            coefficient1 = (Math.random() * 3 + 2).toFixed(2); // Generate random number between 2 and 5
            coefficient2 = (Math.random() * 3 + 5).toFixed(2); // Generate random number between 5 и 8
        }

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
        .then(response => response.json())
        .then(data => {
            updateData(data);
            loadingFinished = true;
            loaderBar.style.animation = 'none'; // Stop animation after receiving data
            loaderBar.style.width = '0'; // Reset the loader width
            airplane.style.animation = 'none'; // Stop airplane animation after receiving data
            void airplane.offsetWidth; // Trigger reflow
            airplane.style.animation = 'airplaneAnimation 10s linear'; // Restart airplane animation
        })
        .catch(error => {
            console.error('Error fetching coefficients:', error);
        });
}

getSignalButton.addEventListener('click', () => {
    if (loadingFinished) {
        loadingFinished = false;
        loaderBar.style.animation = 'none'; // Reset animation
        void loaderBar.offsetWidth; // Trigger reflow
        loaderBar.style.animation = 'loadAnimation 10s linear'; // Start loading animation
        airplane.style.animation = 'none'; // Reset airplane animation
        void airplane.offsetWidth; // Trigger reflow
        airplane.style.animation = 'airplaneAnimation 10s linear'; // Start airplane animation
        setTimeout(() => {
            fetchCoefficients(); // Fetch new coefficients after 10 seconds
        }, 10000); // Ускорение анимации загрузки
    }
});

// Function to update time in real-time
function updateTime() {
    const currentTime = new Date();
    timeContainer.textContent = `Time: ${currentTime.toLocaleTimeString()}`;
}

// Update time every second
setInterval(updateTime, 1000);
