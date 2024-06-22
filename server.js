const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002; // Измените порт на 3002 или любой другой доступный порт

app.use(bodyParser.json());
app.use(cors());

let currentCoefficients = generateRandomCoefficients(); // Initialize with random coefficients

// Endpoint to get coefficients
app.post('/get-coefficients', (req, res) => {
    try {
        // Update current coefficients to random values
        currentCoefficients = generateRandomCoefficients();

        // Send coefficients back as JSON
        res.json({ coefficient1: parseFloat(currentCoefficients.coefficient1), coefficient2: parseFloat(currentCoefficients.coefficient2) });
    } catch (error) {
        console.error('Error generating coefficients:', error);
        res.status(500).json({ error: 'Error generating coefficients' });
    }
});

// Function to generate random coefficients
function generateRandomCoefficients() {
    let coefficient1, coefficient2;
    do {
        coefficient1 = (Math.random() * 2.1 + 2.3).toFixed(2); // Generate random number between 2.3 and 4.4
        coefficient2 = (Math.random() * 2.1 + 4.4).toFixed(2); // Generate random number between 4.4 and 6.5
    } while (parseFloat(coefficient1) >= parseFloat(coefficient2)); // Ensure coefficient2 is greater than coefficient1
    return { coefficient1, coefficient2 };
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Failed to start server on port ${PORT}: ${err.message}`);
});
