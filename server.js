import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/getAvailabilities', async (req, res) => {
    const { arrival, departure } = req.query;
    const url = `https://api.beds24.com/json/getAvailabilities?apiKey=${process.env.API_KEY}&propKey=${process.env.PROP_KEY}&arrival=${arrival}&departure=${departure}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening at http://localhost:${PORT}`);
});
