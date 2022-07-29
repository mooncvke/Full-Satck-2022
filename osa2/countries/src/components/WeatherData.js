import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const coord = country.capitalInfo.latlng.map((la) => la);

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          console.log("data got");
          setWeather(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(weather);

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      {weather.length !== 0 ? (
        <Weather weather={weather} />
      ) : (
        <p>Weather data not available</p>
      )}
    </div>
  );
};

export default WeatherData;
