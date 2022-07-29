import React from "react";
import Country from "./Country.js";

const FindCountries = ({ countries, newFilter, setNewFilter }) => {
  const filtered = () =>
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    );
  return (
    <div>
      <Country
        filtered={filtered}
        countries={countries}
        setNewFilter={setNewFilter}
      />
    </div>
  );
};

export default FindCountries;
