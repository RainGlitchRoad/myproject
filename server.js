const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = 'pupnymjozdwdldeyiysmtebergrkxgjw';
const propKey = 'tgwwqkrcnselmivsrzrdrqvvocffocot';

app.get('/api/getAvailabilities', async (req, res) => {
  const { arrival, departure } = req.query;

  try {
    const response = await fetch(`https://api.beds24.com/json/getAvailabilities?apiKey=${apiKey}&propKey=${propKey}&arrival=${arrival}&departure=${departure}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
