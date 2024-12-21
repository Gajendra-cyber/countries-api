import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([])
  
  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        return setCountriesData(data)
      });
    },[])

    if(!countriesData.length){
      return <CountriesListShimmer />
    }

  const DataArray = countriesData
    .filter(
      (country) =>
        country.name.common.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query)
    )
    .map((country) => {
      return (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          capital={country.capital}
          region={country.region}
          flag={country.flags.svg}
          title={country.name.common}
          population={country.population.toLocaleString("en-IN")}
          data={country}
        />
      );
    });

  return (
    <>
      <div className="countries-container">{DataArray}</div>
    </>
  );
}

export default CountriesList;
