const webAppUrl = 'https://ваш-новый-url-веб-приложения';

const getSignalButton = document.getElementById('getSignalButton');
const coefficientsContainer = document.getElementById('coefficientsContainer');

getSignalButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`${webAppUrl}/coefficients`);
        if (!response.ok) {
            throw new Error('Ошибка получения данных');
        }
        const data = await response.json();
        coefficientsContainer.textContent = `Коэффициенты: ${data.coefficient1}, ${data.coefficient2}`;
    } catch (error) {
        console.error('Ошибка:', error);
        coefficientsContainer.textContent = 'Ошибка получения коэффициентов';
    }
});
