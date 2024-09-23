import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3000;

const WEATHER_API_URL = 'https://api.openweathermap.org/data/3.0/weather';
const ARTWORK_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/437133';

async function fetchData(url, params = {}) {
    const response = await axios.get(url, { params });
    if (response.status !== 200) {
        throw new Error(`API responded with status ${response.status}`);
    }
    return response.data;
}

app.get('/api/temperature', async (req, res) => {
    try {
        const params = {
            lat: 30.2672,
            lon: -97.7431,
            units: 'metric',
            appid: process.env.OPENWEATHERMAP_API_KEY
        };
        const data = await fetchData(WEATHER_API_URL, params);
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

app.get('/api/artwork', async (req, res) => {
    try {
        const artworkData = await fetchData(ARTWORK_API_URL);
        res.json(artworkData);
    } catch (error) {
        console.error('Error fetching artwork data:', error);
        res.status(500).json({ error: 'Failed to fetch artwork data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});