import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Details.css";
import Content from "./Content/Content";

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
  const { theme, country, borders, onChange } = props;
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
            <Content
              theme={theme}
              spanText={"Native Name:"}
              pText={country.nativeName}
            />
            <Content
              theme={theme}
              spanText={"Population:"}
              pText={country.population.toLocaleString()}
            />
            <Content
              theme={theme}
              spanText={"Region:"}
              pText={country.region}
            />
            <Content
              theme={theme}
              spanText={"Sub Region:"}
              pText={country.subregion}
            />
            <Content
              theme={theme}
              spanText={"Capital:"}
              pText={country.capital}
            />
          </div>

          <div>
            <Content
              theme={theme}
              spanText={"Top Level Domain:"}
              pText={country.topLevelDomain}
            />
            <Content
              theme={theme}
              spanText={"Currencies:"}
              pText={country.currencies
                .map((currency) => currency.name)
                .join(", ")}
            />
            <Content
              theme={theme}
              spanText={"Languages:"}
              pText={country.languages
                .map((language) => language.name)
                .join(", ")}
            />
          </div>
        </Info>
        {borders.length !== 0 && (
          <div className="border">
            <span className={theme === "light" ? "span-light" : "span-dark"}>
              Border Countries:{" "}
            </span>
            {borders.map((border) => (
              <Link
                key={border.name}
                to={{
                  pathname: `/${border.name}`,
                  state: { th: theme },
                }}
                onClick={() => onChange(border.name)}
                className={
                  theme === "light" ? "Link btn-light" : "Link btn-dark"
                }
              >
                {border.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </DetailsContainer>
  );
};

export default Details;
