const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Логирование запросов
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Маршрут для проверки доступности сервера
app.get('/ping', (req, res) => {
    res.send('pong');
});

let currentCoefficients = generateRandomCoefficients();

// Обработка GET-запросов для /get-coefficients
app.get('/get-coefficients', (req, res) => {
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

// Обработка POST-запросов для /get-coefficients
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