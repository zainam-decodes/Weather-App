// hourly.js
async function getHourlyForecast(city) {
  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const geo = await geoRes.json();
  const { lat, lon } = geo[0];

  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  const forecastData = await forecastRes.json();

  const hourlyHTML = forecastData.list.slice(0, 24).map(hour => {
    const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="hour-card">
        <p>⏰ ${time}</p>
        <p>🌡️ ${hour.main.temp}°C</p>
        <p>💧 ${hour.main.humidity}%</p>
        <p>🌬️ ${hour.wind.speed} m/s</p>
        <p>${hour.weather[0].main}</p>
      </div>
    `;
  }).join('');

  document.getElementById("hourlyForecast").innerHTML = hourlyHTML;
}
