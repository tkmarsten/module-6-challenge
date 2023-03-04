const APIKey = '&appid=2631366e563930701e1a8536cd28c4ee'
const baseURL = 'https://api.openweathermap.org/data/2.5/'
const currentParam = 'weather?'
const forecastParam = 'forecast?'
let units = '&units=metric'

const searchButton = document.querySelector('.search-button')

searchButton.addEventListener('click', () => {
  const location = document.querySelector('.search-input').value

  fetch(baseURL + currentParam + units + '&q=' + location + APIKey)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      updateWeather(data)
    })
})

function updateWeather(data) {
  const icon = document.querySelector('.icon')
  const temperature = document.querySelector('.temperature')
  const description = document.querySelector('.description')
  const humidity = document.querySelector('.humidity span')
  const wind = document.querySelector('.wind span')

  icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png')
  temperature.innerHTML = data.main.temp
  description.innerHTML = data.weather[0].description
  humidity.innerHTML = data.main.humidity + '%'
  wind.innerHTML = data.wind.speed + 'Km/h'
}



/**
 * Helper function that accepts a forecast object to create the individual cards.
 * @param {Object} forecast 
 * @returns HTML div
function createCard(forecast) {
  const divEl = document.createElement('div')
  divEl.classList.add('forecast-card')

  const dateEl = document.createElement('div')
  dateEl.textContent = forecast.date
  divEl.append(dateEl)

  const tempEl = document.createElement('div')
  tempEl.innerHTML = forecast.temp + '&deg'
  divEl.append(tempEl)

  const iconEl = document.createElement('img')
  iconEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + forecast.icon + '@2x.png')
  divEl.append(iconEl)

  const descriptionEl = document.createElement('div')
  descriptionEl.textContent = forecast.description
  divEl.append(descriptionEl)

  const humidityEl = document.createElement('div')
  humidityEl.textContent = 'Humidity: ' + forecast.humidity + '%'
  divEl.append(humidityEl)

  const windEl = document.createElement('div')
  let unitText = units === '&units=imperial' ? ' MPH' : ' KPH'
  windEl.textContent = 'Wind speed: ' + forecast.wind + unitText
  divEl.append(windEl)

  return divEl
}

/**
 * Gets the current forecast of the city parameter.
 * @param {String} city 
function getCurrentForecast(city) {
  fetch(baseUrl + currentUrl + apiKey + units + '&q=' + city)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      const currEl = document.querySelector('#current-forecast')

      const dataObj = {
        date: 'Today',
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed
      }

      const div = createCard(dataObj)

      currEl.append(div)
    })
}

/**
 * Gets the weekly forecast of the city parameter.
 * @param {String} city
function getWeeklyForecast(city) {
  fetch(baseUrl + forecastUrl + apiKey + units + '&q=' + city)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      const weeklyEl = document.querySelector('#weekly-forecast')

      for (let i = 7; i < data.list.length; i += 8) {
        const dataObj = {
          date: moment.unix(data.list[i].dt).format('MM/DD/YY'),
          temp: data.list[i].main.temp,
          icon: data.list[i].weather[0].icon,
          description: data.list[i].weather[0].description,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed
        }

        const div = createCard(dataObj)
        weeklyEl.append(div)
      }
    })
}

/**
 * Accepts a city parameter which retrieves the forecast of that city.
 * @param {String} city
function getForecast(city) {
  document.querySelector('#current-forecast').textContent = ''
  document.querySelector('#weekly-forecast').textContent = ''

  document.querySelector('#forecastCity').textContent = city
  getCurrentForecast(city)
  getWeeklyForecast(city)
}

*/