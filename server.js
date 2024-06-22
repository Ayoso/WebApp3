const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002; // Измените порт на 3002 или любой другой доступный порт

app.use(bodyParser.json());
app.use(cors());

let currentCoefficients = generateRandomCoefficients(); // Инициализация случайными коэффициентами

// Эндпоинт для получения коэффициентов
app.post('/get-coefficients', (req, res) => {
    try {
        // Обновить текущие коэффициенты случайными значениями
        currentCoefficients = generateRandomCoefficients();

        // Отправить коэффициенты в формате JSON
        res.json({ coefficient1: parseFloat(currentCoefficients.coefficient1), coefficient2: parseFloat(currentCoefficients.coefficient2) });
    } catch (error) {
        console.error('Ошибка при генерации коэффициентов:', error);
        res.status(500).json({ error: 'Ошибка при генерации коэффициентов' });
    }
});

// Функция генерации случайных коэффициентов
function generateRandomCoefficients() {
    let coefficient1, coefficient2;
    do {
        coefficient1 = (Math.random() * 2.7 + 2.3).toFixed(2); // Генерация случайного числа от 2.3 до 5.0
        coefficient2 = (Math.random() * 3.5 + parseFloat(coefficient1) + 1).toFixed(2); // Генерация случайного числа от coefficient1 + 1 до coefficient1 + 4.5
    } while (parseFloat(coefficient1) >= parseFloat(coefficient2)); // Убедиться, что coefficient2 больше coefficient1
    return { coefficient1, coefficient2 };
}

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
}).on('error', (err) => {
    console.error(`Не удалось запустить сервер на порту ${PORT}: ${err.message}`);
});
