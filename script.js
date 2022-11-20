const apiKey = 'appid=2631366e563930701e1a8536cd28c4ee'
const baseUrl = 'https://api.openweathermap.org/data/2.5/'
const currentUrl = 'weather?'
const forecastUrl = 'forecast?'
let units = '&units=imperial'
let searches = []

/**
 * Listener for the switch button that changes the units.
 */
const unitBtn = document.querySelector('#unitSwitch')
unitBtn.addEventListener('click', e => {
  units = e.target.checked ? '&units=metric' : '&units=imperial'
  getForecast(document.querySelector('#forecastCity').textContent)
})

/**
 * Listener for the search city field.
 */
const searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', e => {
  e.preventDefault()

  const city = document.querySelector('#searchCity').value

  getForecast(city)

  searches.push(city)
  localStorage.setItem('searches', JSON.stringify(searches))
})

/**
 * Listener for all buttons in the search history list.
 */
const searchList = document.querySelector('#searchHistory')
searchList.addEventListener('click', e => {
  getForecast(e.target.textContent)
})

/**
 * Helper function that accepts a forecast object to create the individual cards.
 * @param {Object} forecast 
 * @returns HTML div
 */
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
 */
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
 */
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
 */
function getForecast(city) {
  document.querySelector('#current-forecast').textContent = ''
  document.querySelector('#weekly-forecast').textContent = ''

  document.querySelector('#forecastCity').textContent = city
  getCurrentForecast(city)
  getWeeklyForecast(city)
}

/**
 * Retrieves the search history from local storage and displays it in a list.
 */
function init() {
  searches = JSON.parse(localStorage.getItem('searches'))
  const historyList = document.querySelector('#searchHistory')
  if (searches) {
    searches.forEach(cityName => {
      const listEl = document.createElement('li')
      const buttonEl = document.createElement('button')
      buttonEl.textContent = cityName
      listEl.append(buttonEl)
      historyList.append(listEl)
    })
  }
}

init()