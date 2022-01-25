let key = "e4c70ce6a6821649a416cb9521d5f4f8"; //api_key

let current_day = document.getElementById("current_day");
let time = document.getElementById("time");
let body = document.querySelector("body");
let wrapper = document.getElementById("wrapper");
let daily_wrap = document.createElement("div");
daily_wrap.setAttribute("id", "daily_wrap");
body.append(daily_wrap);

//Current Day and Time
setInterval(() => {
  const dayname = new Date().toLocaleDateString("en", {
    weekday: "long",
  });
  current_day.textContent = dayname;
  const newdate = new Date();
  const hours = newdate.getHours();
  let hrformat = hours >= 13 ? hours % 12 : hours;
  if (hrformat == 0) {
    hrformat = 12;
  }
  const minutes = newdate.getMinutes();
  const seconds = newdate.getSeconds();
  const am_pm = hours >= 12 ? "PM" : "AM";
  time.innerHTML =
    hrformat +
    ":" +
    minutes +
    ":" +
    seconds +
    `<span id="am_pm"> ${am_pm}</span>`;
}, 0000);

//fetching data from openweather api
async function getData() {
  let input = document.getElementById("city").value;

  let url_1 = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}&units=metric`;
  let res = await fetch(url_1);
  let wethdata = await res.json();
  return wethdata;
}
//displaying fetched data
async function displayData() {
  wrapper.innerHTML = "";
  let dataArr = [];
  let data = await getData();
  dataArr.push(data);
  const lon = data.coord.lon;
  const lat = data.coord.lat;
  displaydaily(lon, lat);

  dataArr.map(function (item) {
    wrapper.innerHTML = "";

    let clim_icon = document.createElement("img");
    clim_icon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    let clim = document.createElement("div");
    clim.textContent = item.weather[0].description;
    let temp = document.createElement("div");
    temp.textContent = `${Math.round(item.main.temp)} °C`;

    let wrap1 = document.createElement("div");
    wrap1.setAttribute("id", "wrap1");

    let hum_img = document.createElement("img");
    hum_img.setAttribute("src", "images/humidity.png");
    let hum_txt = document.createElement("div");
    hum_txt.textContent = "Humidity";
    let hum_cont = document.createElement("div");
    hum_cont.textContent = `${item.main.humidity} %`;
    let humidity = document.createElement("div");
    humidity.setAttribute("id", "humid_wrap");

    let pres_img = document.createElement("img");
    pres_img.setAttribute("src", "images/pressure.png");
    let pres_txt = document.createElement("div");
    pres_txt.textContent = "Air Pressure";
    let pres_cont = document.createElement("div");
    pres_cont.textContent = `${item.main.pressure} hpa`;
    let pressure = document.createElement("div");
    pressure.setAttribute("id", "pressure_wrap");

    let wind_img = document.createElement("img");
    wind_img.setAttribute("src", "images/wind.png");
    let wind_txt = document.createElement("div");
    wind_txt.textContent = "Wind Speed";
    let wind_cont = document.createElement("div");
    wind_cont.textContent = `${item.wind.speed} m/s`;
    let wind = document.createElement("div");
    wind.setAttribute("id", "wind_wrap");

    let wrap2 = document.createElement("div");
    wrap2.setAttribute("id", "wrap2");
    wind.append(wind_img, wind_txt, wind_cont);
    pressure.append(pres_img, pres_txt, pres_cont);
    humidity.append(hum_img, hum_txt, hum_cont);
    wrap1.append(clim_icon, clim, temp);
    wrap2.append(humidity, pressure, wind);
    wrapper.append(wrap1, wrap2);
  });
}
//fetching data for 7 days weather

async function getdailyweather(lon, lat) {
  let input = document.getElementById("city").value;
  let url_2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8`;

  let dailyweth = await fetch(url_2);
  let dailydata = await dailyweth.json();
  return dailydata.daily;
}
//displaying 7 days weather data

async function displaydaily(lon, lat) {
  var daily = await getdailyweather(lon, lat);
  daily_wrap.innerHTML = "";
  daily.map(function (item, index) {
    if (index > 0) {
      let dayname = new Date(item.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      let day = document.createElement("div");
      day.setAttribute("id", "day");
      day.textContent = dayname;
      let daily_weth_icon = document.createElement("img");
      daily_weth_icon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

      let morn_logo = document.createElement("img");
      morn_logo.src = "images/sun.png";
      let morn_cont = document.createElement("div");
      morn_cont.textContent = `${Math.round(item.temp.morn)} °C`;
      let daily_temp_morn = document.createElement("div");
      daily_temp_morn.setAttribute("id", "daily_temp_morn");

      let night_logo = document.createElement("img");
      night_logo.src = "images/Moon.png";
      let night_cont = document.createElement("div");
      night_cont.textContent = `${Math.round(item.temp.night)} °C`;
      let daily_temp_night = document.createElement("div");
      daily_temp_night.setAttribute("id", "daily_temp_night");

      let daily_data = document.createElement("div");
      daily_data.setAttribute("id", "daily_data");

      daily_temp_night.append(night_logo, night_cont);
      daily_temp_morn.append(morn_logo, morn_cont);
      daily_data.append(
        day,
        daily_weth_icon,
        daily_temp_morn,
        daily_temp_night
      );
      daily_wrap.append(daily_data);
    }
  });
}
//redirecting to the map page
let displayMap = () => {
  let input = document.getElementById("city").value;
  const input_val = localStorage.setItem("input", JSON.stringify(input));
  window.location.href = "Map.html";
};
