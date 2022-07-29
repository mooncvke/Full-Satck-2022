import React from "react";

const Weather = ({ weather }) => {
  const icons = weather.weather.map((w) => w.icon);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Temperature {weather.main.temp} Celsius</p>
      {icons.map((icon) => (
        <img
          key={icon}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          style={{ width: "5rem" }}
        />
      ))}
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
