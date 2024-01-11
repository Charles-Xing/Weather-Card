const apikey = "5d50cb77a4d850371ce5a430e31c9b24";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

const getWeatherData = async (cityValue) => {
  console.log("cityValue", cityValue);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `HUmidity: ${data.main.humidity} %`,
      `Wind Speed: ${data.wind.speed} m/s`
    ]
    console.log(icon)

    weatherDataEl.querySelector(".icon").innerHTML = `<img src='https://openweathermap.org/img/wn/${icon}.png' alt='weather icon'/>`;
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;
    weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent = "";
    weatherDataEl.querySelector(".details").innerHTML = "";
    alert("Please check the city spelling");
  }

}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
})