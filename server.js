const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Либо укажите точный домен вашего фронтенд приложения
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static(path.join(__dirname, 'public')));

let currentCoefficients = generateRandomCoefficients(); // Инициализация случайными коэффициентами

// Эндпоинт для получения коэффициентов
app.post('/get-coefficients', (req, res) => {
    try {
        currentCoefficients = generateRandomCoefficients();
        console.log('Отправка коэффициентов:', currentCoefficients);
        res.json({
            coefficient1: parseFloat(currentCoefficients.coefficient1),
            coefficient2: parseFloat(currentCoefficients.coefficient2)
        });
    } catch (error) {
        console.error('Ошибка при генерации коэффициентов:', error);
        res.status(500).json({ error: 'Ошибка при генерации коэффициентов' });
    }
});

function generateRandomCoefficients() {
    let coefficient1, coefficient2;
    do {
        coefficient1 = (Math.random() * 2.7 + 2.3).toFixed(2);
        coefficient2 = (Math.random() * 3.5 + parseFloat(coefficient1) + 1).toFixed(2);
    } while (parseFloat(coefficient1) >= parseFloat(coefficient2));
    return { coefficient1, coefficient2 };
}

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
}).on('error', (err) => {
    console.error(`Не удалось запустить сервер на порту ${PORT}: ${err.message}`);
});
