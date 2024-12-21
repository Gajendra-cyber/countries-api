import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

const CountryDetail = () => {
  const params = useParams();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);

  const [notFound, setNotFound] = useState(false);

  const {state} = useLocation()

 function updateCountryData(data){
  setCountryData({
    flag: data.flags.svg,
    name: data.name.common || data.name,
    capital: (data.capital),
    population: data.population,
    nativeName: Object.values(data.name.nativeName || {})[0].common,
    region: data.region,
    subRegion: data.subregion,
    topLevelDomain: Object.values(data.tld)[0],
    currencies: Object.values(data.currencies || {})
      .map((currency) => currency.name)
      .join(", "),
    languages: Object.values(data.languages || {}).join(", "),
    borderCountries: [],
  });

  if (data.borders) {
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({...prevState, borderCountries: [...prevState.borderCountries, borders],
      }));
    });
  }
 }

  useEffect(() => {
    
    if(state){
      
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data)
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);
  
  if (notFound) {
    return <div>Country Not Found</div>;
  }


  const [isDark] = useTheme()
  
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
    <CountryDetailShimmer />
  ) : (

        <div className="country-details">
          <img src={countryData.flag} alt="" />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName || countryData.name}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString("en-In")}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subRegion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital?.join(',')}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.topLevelDomain}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borderCountries.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {
                countryData.borderCountries.map((borders) => borders.map((border)=>(<Link key={border} to={`/${border}`}>{border}</Link>)) )
              }
              </div>
            )}
          </div>
        </div>
  )}
      </div>
    </main>
  )
};

export default CountryDetail;
