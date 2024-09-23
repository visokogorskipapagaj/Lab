const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/temperature', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Austin,US&units=imperial&appid=${apiKey}`);
        const temperature = Math.round(response.data.main.temp);
        res.json({ temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Unable to fetch temperature' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});