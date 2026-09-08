import React, { useEffect, useState } from 'react';
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/api/nasa/apod', async (req, res) => {
  try {
    const nasaRes = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    const data = await nasaRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'NASA API request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function NasaApod() {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApod = async () => {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      const data = await response.json();
      setApodData(data);
    };

    fetchApod();
  }, []);

  if (!apodData) return <p>Loading NASA Picture of the Day...</p>;

  return (
    <div>
      <h2>{apodData.title}</h2>
      <img src={apodData.url} alt={apodData.title} style={{ maxWidth: '100%' }} />
      <p>{apodData.explanation}</p>
    </div>
  );
}
fetch('/api/nasa/apod')
  .then(res => res.json())
  .then(data => console.log(data));


export default NasaApod;
