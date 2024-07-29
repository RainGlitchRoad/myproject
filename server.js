import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log the API keys for debugging
console.log('API_KEY:', process.env.API_KEY);
console.log('PROP_KEY:', process.env.PROP_KEY);

app.get('/api/getAvailabilities', async (req, res) => {
  const { arrival, departure } = req.query;
  console.log(`Fetching data for arrival: ${arrival}, departure: ${departure}`);

  try {
    const response = await fetch(`https://api.yourservice.com/getAvailabilities?arrival=${arrival}&departure=${departure}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    console.log(`API response status: ${response.status}`);
    
    const data = await response.json();
    console.log('API response data:', data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
