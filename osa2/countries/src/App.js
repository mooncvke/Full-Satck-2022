import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import FindCountries from "./components/FindCountries.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };
  return (
    <div>
      <p>
        find countries
        <input value={newFilter} onChange={handleFilterChange} />{" "}
      </p>
      <FindCountries
        countries={countries}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
      />
    </div>
  );
};

export default App;
