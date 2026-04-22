// radar.js
function loadRadarMap(city) {
  const radarImage = `
    <img src="https://tile.openweathermap.org/map/precipitation_new/10/524/391.png?appid=${API_KEY}" 
         alt="Radar image" style="width:100%; max-width:600px;">
    <p style="font-size: 0.8rem;">📍 Sample radar map using OpenWeatherMap tiles</p>
  `;
  document.getElementById("radarMap").innerHTML = radarImage;
}
