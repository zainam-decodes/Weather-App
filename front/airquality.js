// airquality.js
async function getAirQuality(city) {
  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const geo = await geoRes.json();
  const { lat, lon } = geo[0];

  const airRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const airData = await airRes.json();
  const aqi = airData.list[0].main.aqi;

  const AQI_LEVELS = ["Good 😊", "Fair 🙂", "Moderate 😐", "Poor 😷", "Very Poor 😫"];

  document.getElementById("airQuality").innerHTML = `
    <div class="aqi-card">
      <h3>AQI: ${aqi} - ${AQI_LEVELS[aqi - 1]}</h3>
    </div>
  `;
}
