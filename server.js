import fetch from 'node-fetch';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/getAvailabilities', async (req, res) => {
  const { arrival, departure } = req.query;
  const apiKey = 'pupnymjozdwdldeyiysmtebergrkxgjw';
  const propKey = 'tgwwqkrcnselmivsrzrdrqvvocffocot';

  try {
    const response = await fetch(`https://api.beds24.com/json/getAvailabilities?apiKey=${apiKey}&propKey=${propKey}&arrival=${arrival}&departure=${departure}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
