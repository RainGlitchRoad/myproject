import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('API_KEY:', process.env.API_KEY);
console.log('PROP_KEY:', process.env.PROP_KEY);

app.get('/api/getAvailabilities', async (req, res) => {
  const { arrival, departure } = req.query;
  console.log(`Fetching data for arrival: ${arrival}, departure: ${departure}`);

  try {
    const response = await fetch('https://api.beds24.com/json/getAvailabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.API_KEY
      },
      body: JSON.stringify({
        "arrival": arrival,
        "departure": departure,
        "propId": process.env.PROP_KEY
      })
    });

    console.log(`API response status: ${response.status}`);
    const text = await response.text();
    console.log('API response text:', text);  // Log the raw response body

    // Attempt to parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).send('Error parsing JSON response');
    }

    if (!response.ok) {
      console.error('API error response:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
