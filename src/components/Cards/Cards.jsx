import React from "react";
import SingleCard from "./Card/SingleCard";
import "./Cards.css";

const Cards = (props) => {
  const { theme, countries } = props;
  return (
    <div className={theme === "light" ? "container-light" : "container-dark"}>
      {countries.map((x, i) => {
        return <SingleCard theme={theme} country={x} key={i} />;
      })}
    </div>
  );
};

export default Cards;
