const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let currentCoefficients = generateRandomCoefficients(); // Инициализация случайных коэффициентов

// Эндпоинт для получения коэффициентов
app.post('/get-coefficients', (req, res) => {
    try {
        // Обновляем текущие коэффициенты на случайные
        currentCoefficients = generateRandomCoefficients();

        // Отправляем коэффициенты обратно в виде JSON
        res.json({ coefficient1: parseFloat(currentCoefficients[0]), coefficient2: parseFloat(currentCoefficients[1]) });
    } catch (error) {
        console.error('Ошибка при генерации коэффициентов:', error);
        res.status(500).json({ error: 'Ошибка при генерации коэффициентов' });
    }
});

// Функция для генерации случайных коэффициентов
function generateRandomCoefficients() {
    const coefficient1 = (Math.random() * 5 + 1).toFixed(2); // Генерируем случайное число от 1 до 6 с двумя знаками после запятой
    const coefficient2 = (Math.random() * 5 + 1).toFixed(2); // Генерируем случайное число от 1 до 6 с двумя знаками после запятой
    return [coefficient1, coefficient2];
}

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
