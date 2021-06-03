import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import "./Details.css";

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 100px;
  @media screen and (max-width: 900px) {
    gap: 20px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 2;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 440px;
  object-fit: contain;
  @media screen and (max-width: 700px) {
    height: auto;
    margin: 20px 0;
  }
`;

const Details = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { theme, country, borders } = props;
  return (
    <DetailsContainer>
      <Img
        src={country.flag}
        alt={`${country.name}'s flag`}
        className="img-class"
      ></Img>
      <div>
        <h1 className={theme === "light" ? "p-light" : "p-dark"}>
          {country.name}
        </h1>
        <Info>
          <div style={{ marginBottom: "30px" }}>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Native Name:{" "}
              </span>
              {country.nativeName}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Population:{" "}
              </span>
              {country.population.toLocaleString()}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Region:
              </span>{" "}
              {country.region}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Sub Region:
              </span>{" "}
              {country.subregion}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Capital:
              </span>{" "}
              {country.capital}
            </p>
          </div>

          <div>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Top Level Domain:{" "}
              </span>
              {country.topLevelDomain}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Currencies:{" "}
              </span>
              {country.currencies.map((currency) => currency.name).join(", ")}
            </p>
            <p className={theme === "light" ? "text-light" : "text-dark"}>
              <span className={theme === "light" ? "span-light" : "span-dark"}>
                Languages:{" "}
              </span>
              {country.languages.map((language) => language.name).join(", ")}
            </p>
          </div>
        </Info>
        {borders.length !== 0 && (
          <div className="border">
            <span className={theme === "light" ? "span-light" : "span-dark"}>
              Border Countries:{" "}
            </span>
            {borders.map((border) => (
              <div
                key={border.name}
                // to={{
                //   pathname: `/${border.name}`,
                //   state: { th: theme },
                // }}
                onClick={() => {
                  location.state = { th: theme };
                  history.replace(`/${border.name}`);
                }}
                className={
                  theme === "light" ? "Link btn-light" : "Link btn-dark"
                }
              >
                {border.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </DetailsContainer>
  );
};

export default Details;
