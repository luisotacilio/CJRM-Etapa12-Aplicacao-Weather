const form = document.querySelector('form');
const formImg = document.querySelector('.midleCard');
const cityDay = document.querySelector('[data-js="dd-mm-yyyy"]');
const cityName = document.querySelector('[data-js="city-name"]');
const cityWeather = document.querySelector('[data-js="city-weather"]');
const cityTemperature = document.querySelector('[data-js="city-temperature"]');
const cityIconWeather = document.querySelector('[data-js="icon-weather"]');

const showInfoWeather = async (nameCity) => {
  
  const data = await getDataCityWeather(nameCity);
  
  const { main, sys, name, dt} = data;
  const { weather : [ { description, icon } ] } = data;
  
  cityDay.textContent = convertLocaleDateBr(dt);
  cityName.textContent = `${name} - ${sys.country}`;
  cityWeather.textContent = `Tempo agora : ${description}`;
  cityTemperature.innerHTML = `${main.temp} <span>&deg;C</span>`;
  cityIconWeather.setAttribute('src', `${baseUrlImg}/${icon}.png`);
  getImageDayOrNight(dt, sys.sunset);
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameCity = event.target.city.value;
  showInfoWeather(nameCity);
  form.reset();
});

const convertLocaleDateBr = (strNumber) => {
  const date = new Date(strNumber * 1000);
  const anDay = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const strDay = String(anDay).length === 1 ? `0${anDay}` : `${anDay}`;
  const strMonth = String(month).length === 1 ? `0${month}` : `${month}`;
  const strDate = `${strDay}/${strMonth}/${year}`;

  return strDate;
};

const getImageDayOrNight = (inputNow, inputTime) => {
  if (inputNow < inputTime) {
    formImg.innerHTML = `<img src="./img/sunrise.jpg" title="dia">`;
  } else {
    formImg.innerHTML = `<img src="./img/sunset.jpg" title="noite">`;
  }
};
