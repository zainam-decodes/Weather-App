export default async function handler(req, res) {
  const city = req.query.city;

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      description: data.weather[0].description
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}
