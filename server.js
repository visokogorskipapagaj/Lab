import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';  // Add this line

dotenv.config();

const app = express();
const port = 3000;

app.get('/api/temperature', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const lat = 30.2672; // Austin, TX
        const lon = -97.7431;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);  // Change this line

        const data = response.data;  // Change this line

        if (response.status !== 200) {  // Change this line
            throw new Error(`API responded with status ${response.status}`);
        }

        const temperature = data.main?.temp;
        if (temperature === undefined) {
            throw new Error('Temperature data not found in API response');
        }

        res.json({ temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Failed to fetch temperature' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});