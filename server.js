const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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
    const coefficient1 = (Math.random() * 5 + 1).toFixed(2); // Generate random number between 1 and 6
    const coefficient2 = (Math.random() * 5 + 1).toFixed(2); // Generate random number between 1 and 6
    return { coefficient1, coefficient2 };
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
