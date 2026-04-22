// daily.js
async function getDailyForecast(city) {
  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const geo = await geoRes.json();
  const { lat, lon } = geo[0];

  const dailyRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`);
  const dailyData = await dailyRes.json();

  const dailyHTML = dailyData.daily.slice(0, 7).map((day, idx) => {
    const date = new Date(day.dt * 1000).toDateString();
    return `
      <div class="day-card">
        <p>📅 ${date}</p>
        <p>🌡️ ${day.temp.day}°C / ${day.temp.night}°C</p>
        <p>💧 ${day.humidity}%</p>
        <p>🌬️ ${day.wind_speed} m/s</p>
        <p>${day.weather[0].main}</p>
      </div>
    `;
  }).join('');

  document.getElementById("dailyForecast").innerHTML = dailyHTML;
}
