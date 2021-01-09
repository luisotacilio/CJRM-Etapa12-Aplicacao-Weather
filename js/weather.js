const APIKey = '8bfa08757c34117a7b31075d85e1e3ed';
const baseUrl = `http://api.openweathermap.org/`;
const baseUrlImg = `http://openweathermap.org/img/w`;

const getDataCityWeather = async (cityName) => {
  url = `${baseUrl}data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Não foi possível obter dados!`);
    }
    return response.json();
  } catch ({ name, message }) {
    alert(`${name} : ${message}`);
  }
};
