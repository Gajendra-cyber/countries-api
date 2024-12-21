
import { Link } from "react-router-dom";

function CountryCard({ name, capital, region, flag, title, population, data }) {
  return (
    <Link className="country-card" to={`/${name}`} state={data}>
      <div className="flag-container">
        <img src={flag} alt={title} />
      </div>
      <div className="card-text">
        <h3 className="card-title">{title}</h3>
        <p>
          <b>Population: </b>
          {population}
        </p>
        <p>
          <b>Region: </b>
          {region}
        </p>
        <p>
          <b>Capital: </b>
          {capital}{" "}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;
