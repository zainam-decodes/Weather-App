export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!data || data.cod !== 200) {
      return res.status(500).json({ error: "Weather fetch failed", data });
    }

    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
