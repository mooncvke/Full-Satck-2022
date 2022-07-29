import React from "react";
import WeatherData from "./WeatherData.js";
import CreateButton from "./CreateButton.js";

const Country = ({ filtered, countries, setNewFilter }) => {
  if (
    filtered().map((country) =>
      countries.find((element) => element.name.official === filtered())
    ).length > 10
  ) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (
    filtered().map((country) =>
      countries.find((element) => element.name.official === filtered())
    ).length === 1
  ) {
    let country = "";
    filtered().map((country1) => (country = country1));

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital} <br></br>
          area {country.area}
        </p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map(
            (language, index) => (
              console.log(country.languages.language),
              (<li key={index}>{country.languages[language]}</li>)
            )
          )}
        </ul>
        <img src={country.flags.png} alt="flag" />
        <WeatherData country={country} />
      </div>
    );
  } else {
    return (
      <div>
        {filtered().map((country, index) => (
          <form key={index}>
            {country.name.common}{" "}
            <CreateButton country={country} setNewFilter={setNewFilter} />
          </form>
        ))}
      </div>
    );
  }
};

export default Country;
