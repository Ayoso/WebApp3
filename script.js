const webAppUrl = 'http://localhost:3002'; // Обновите порт, если вы изменили его в server.js

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.getElementById('getSignalButton');

let loadingFinished = true; // Initial value set to true

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
        .then(response => response.json())
        .then(data => {
            updateData(data);
            loadingFinished = true;
            loaderBar.style.animation = 'none'; // Stop animation after receiving data
            loaderBar.style.width = '0'; // Reset the loader width
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
        loaderBar.style.animation = 'loadAnimation 25s linear'; // Start loading animation
        setTimeout(() => {
            fetchCoefficients(); // Fetch new coefficients after 25 seconds
        }, 25000);
    }
});

// Function to update time in real-time
function updateTime() {
    const currentTime = new Date();
    timeContainer.textContent = `Time: ${currentTime.toLocaleTimeString()}`;
}

// Update time every second
setInterval(updateTime, 1000);
