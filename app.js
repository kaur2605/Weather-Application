const api = {
  key: "b245681af662cb64bc5ef406654bcbaa",
  baseurl: "http://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", searchdata);

function searchdata(e) {
  if (e.keyCode == 13) {
    Getdata(searchbox.value);
    console.log(searchbox.value);
  }
}

function Getdata(query) {
  fetch(`${api.baseurl}weather?q=${query}&unit=metric&APPID=${api.key}`)
    .then((weather) => weather.json())
    .then(displayresult);

  function displayresult(weather) {
    console.log(weather);
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let data = document.querySelector(".date");

    data.innerText = databuilder(now);

    function databuilder(d) {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let month = months[d.getMonth()];
      let date = d.getDate();
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year} `;
    }

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let feel = document.querySelector(".feel");
    feel.innerHTML = ` feels like ${Math.round(
      weather.main.feels_like
    )}<span>°C</span>`;

    let weath = document.querySelector(".weather");
    weath.innerText = `${weather.weather[0].main} `;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C/ ${Math.round(
      weather.main.temp_max
    )}°C`;
  }
}
