import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    res.json({
      city: data.name,
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

