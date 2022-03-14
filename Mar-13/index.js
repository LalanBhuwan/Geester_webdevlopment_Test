let loction_show = document.getElementById("location_div");
let tempIcon = document.getElementById("temp_icon");
let tempValue = document.getElementById("temp_value");
let tempUnit = document.getElementById("temp_unit");
let climateText = document.getElementById("climate");
const input_city = document.getElementById("input_search_city");
const search_Button = document.getElementById("search_btn");

search_Button.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(input_city.value);
  input_city.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a237bec5c06d2d6ddd405a8e4cc65a4`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loction_show.innerText = name;
    tempValue.innerText = Math.round(feels_like - 273);
  } catch (error) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6a237bec5c06d2d6ddd405a8e4cc65a4`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loction_show.innerText = name;
          climateText.innerText = main;
          tempValue.innerText = Math.round(feels_like - 273);
          console.log(data);
        });
    });
  }
});
