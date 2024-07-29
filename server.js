const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/getAvailabilities', async (req, res) => {
  const { arrival, departure } = req.query;
  const apiKey = process.env.API_KEY;
  const propKey = process.env.PROP_KEY;

  if (!arrival || !departure) {
    return res.status(400).json({ error: 'Arrival and departure dates are required' });
  }

  try {
    const response = await fetch(`https://api.beds24.com/json/getAvailabilities?apiKey=${apiKey}&propKey=${propKey}&arrival=${arrival}&departure=${departure}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
