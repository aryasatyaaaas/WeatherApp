const inputCity = document.getElementById("inputCity");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const tempMore = document.getElementById("temp-more");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");
const weatherDesc = document.getElementById("weather-desc");
const weatherIcon = document.getElementById("weather-icon");
// --------------------------------------------------------------

// default load
window.addEventListener("DOMContentLoaded", () => {
  getWeather("Jakarta");
});

// search
searchBtn.addEventListener("click", () => {
  let city = inputCity.value;
  if (city === "") {
    city = "Jakarta";
  }
  getWeather(city);
});

async function getWeather(location) {
  try {
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=53ddcf90b5dc4d4a27056ef89b1b48a8
&units=metric`);
    if (!response.ok) {
      throw new Error("Data not found");
    }

    const data = await response.json();
    // console.log(data);
    // temp
    temp.innerHTML = `${data.main.temp}&degC`;
    tempMore.innerHTML = `${data.main.temp}&degC`;
    // city name
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    // wind
    wind.innerText = `${data.wind.speed}km/h`;
    // humidity
    humidity.innerText = `${data.main.humidity}%`;
    // icon and info
    condition.innerText = `${data.weather[0].main}`;
    if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/cloud.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/sun.png";
    } else if (data.weather[0].main === "Haze") {
      weatherIcon.src = "images/haze.png";
    }
    weatherDesc.innerText = `${data.weather[0].description}`;
  } catch (error) {
    console.log(error);
  }
}
