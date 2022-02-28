const param = {
    'url' : 'https://api.openweathermap.org/data/2.5/',
    'appid' : '82e81ce17ba90abeee4f1fdacb69cf7c'
}

let cities = {
    472757: 'Волгоград',
    484907: 'Таганрог',
    498817: 'Санкт-Петербург'
}

function getWeather() {
    const cityId = document.querySelector('.list-cities').value;

    fetch(`${param.url}weather?id=${cityId}&units=metric&lang=ru&appid=${param.appid}`)

    .then(function(weather) {
        return weather.json();
    })
    
    .then(showWeather)
}

function showWeather(data) {
    let date = new Date(data.dt * 1000);
    let dateOptions = {day: 'numeric', month: 'long', weekday: 'long'};

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.block-weather-subtitle').textContent = date.toLocaleString('ru-RU', dateOptions);
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.temperature-image').innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`;
    document.querySelector('.weather-description-text').textContent = data.weather[0].description;
    document.querySelector('.wind-speed-val').textContent = Math.round(data.wind.speed) + ' м/с';
    document.querySelector('.humidity-val').textContent = data.main.humidity + '%';
    document.querySelector('.pressure-val').textContent = Math.round(data.main.pressure * 0.75) + ' мм рт. ст.';
}

function createSelect() {
    let select = document.createElement('select');

    select.classList.add('list-cities');
    
    for (let key in cities) {
        let option = document.createElement('option');

        option.setAttribute('value', key);
        option.textContent = cities[key];

        select.appendChild(option);
    }
    
    document.querySelector('.select-wrapper').appendChild(select);
}

createSelect();
getWeather();
document.querySelector('.list-cities').onchange = getWeather;

