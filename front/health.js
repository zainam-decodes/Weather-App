// health.js
function getHealthTips(temp, humidity, aqi) {
  const tips = [];

  if (temp > 35) tips.push("🚨 Stay hydrated and avoid outdoor activities.");
  if (humidity > 80) tips.push("🌫️ High humidity detected. Stay cool.");
  if (aqi >= 3) tips.push("😷 Poor air quality. Use a mask outdoors.");
  if (tips.length === 0) tips.push("✅ Weather is healthy for most people!");

  document.getElementById("healthTips").innerHTML = tips.map(t => `<li>${t}</li>`).join("");
}
