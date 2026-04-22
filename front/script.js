//script.js
async function getTodayWeather(city) {
  if (!city) {
    alert("Enter a city");
    return;
  }

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("todayWeather").innerHTML = `
      <div class="weather-card">
        <h2>${data.city}</h2>
        <p>🌡️ Temperature: ${data.temperature}°C</p>
        <p>💧 Humidity: ${data.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind} m/s</p>
        <p>☁️ Condition: ${data.description}</p>
      </div>
    `;

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?weather,${city}')`;

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}