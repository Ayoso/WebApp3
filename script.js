const webAppUrl = 'https://legendary-bombolone-18e5fd.netlify.app'; // Replace with your URL

const coefficientsContainer = document.getElementById('coefficientsContainer');
const timeContainer = document.getElementById('timeContainer');
const chanceContainer = document.getElementById('chanceContainer');
const loaderBar = document.querySelector('.loader-bar');
const getSignalButton = document.querySelector('.get-signal-button');
const goToGameButton = document.querySelector('.go-to-game-button');

let loadingFinished = true; // Initial value set to true

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
        loaderBar.style.animation = 'loadAnimation 25s linear'; // Start loading animation
        setTimeout(() => {
            fetchCoefficients(); // Fetch new coefficients after 25 seconds
        }, 25000);
    }
});

goToGameButton.addEventListener('click', () => {
    window.location.href = 'https://your-game-url.com'; // Replace with your game URL
});

// Function to update time in real-time
function updateTime() {
    const currentTime = new Date();
    timeContainer.textContent = `Time: ${currentTime.toLocaleTimeString()}`;
}

// Update time every second
setInterval(updateTime, 1000);
