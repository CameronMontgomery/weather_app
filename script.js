// API information
const api = {
  key: 'fb08f68cb8a3aea3164c13ab0ccd1061',
  base: 'https://api.openweathermap.org/data/2.5/'
}

// This identifies and controls the event listener for the search box
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', startSearch)
let icon = document.createElement('img');

// When the enter key is pressed this will detect if it is a number or string and then run appropriate function
function startSearch(event) {
  if (event.keyCode == 13) {
    if (isNaN(searchBox.value)) {
      getResults(searchBox.value)
    } else {
      getZipResults(searchBox.value);
    }
  }
}


// This will run when a string is placed in the search box
function getResults(location){
  axios.get(`${api.base}weather?q=${location}&units=imperial&appid=${api.key}`)
    .then(function(response) {
      displayResults(response);
    })
    .catch(function(err) {
      console.log(err);
      alert(`The location ${location} you entered is not valid or in the wrong format. Please enter just the city name, without state, or U.S. zip code`)
    })
    .then(function(data) {
    })
}

// This will run when a number is placed in the search box
function getZipResults(location){
  axios.get(`${api.base}weather?zip=${location}&units=imperial&appid=${api.key}`)
    .then(function(response) {
      displayResults(response);
    })
    .catch(function(err) {
      console.log(err);
      alert(`The location ${location} you entered is not valid or in the wrong format. Please enter just the city name, without state, or U.S. zip code`)
    })
    .then(function(data) {
    })
}

// This function controls DOM manipulation and placement
function displayResults(results) {
  console.log(results);
  results = results.data;
  let city = document.querySelector('.location .city');
  city.innerText = `${results.name}, ${results.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(results.main.temp)}<span class="temp-symbol">°</span><span class='temp-type'>F</span>`;

  let description = document.querySelector('.current .weather');
  description.innerText = results.weather[0].main;

  let lowHigh = document.querySelector('.current .low-high');
  lowHigh.innerText = `${Math.round(results.main.temp_min)}°F / ${Math.round(results.main.temp_max)}°F`;

  
  icon.src = '';
  let src;
  console.log(icon)
  if (results.weather[0].main === 'Clouds') {
    src = './img/47309_overcast_icon.png';
  } else if (results.weather[0].main === 'Rain' || results.weather[0].main === 'Thunderstorm' || results.weather[0].main === 'Drizzle') {
    src = './img/118964_weather_scattered_showers_icon.png';
  } else if (results.weather[0].main === 'Snow') {
    src = './img/47313_occasional_snow_icon.png';
  } else if (results.weather[0].main === 'Clear') {
    src = './img/47314_weather_icon.png';
  }
  icon.src = src;
  document.querySelector('.icon').appendChild(icon);
}

// This function outputs and formats date and time.
function dateBuilder(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear()

  return `${day}, ${date} ${month} ${year}`
}
