const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Endpoint для получения коэффициентов
app.get('/coefficients', (req, res) => {
    const coefficient1 = (Math.random() * 5 + 1).toFixed(2);
    const coefficient2 = (Math.random() * 5 + 1).toFixed(2);
    res.json({ coefficient1, coefficient2 });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
