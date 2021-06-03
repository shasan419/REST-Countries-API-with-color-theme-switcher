import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import "./SingleCard.css";

const useStyles = makeStyles({
  rootLight: {
    maxWidth: 300,
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    overflow: "hidden",
    background: "hsl(0, 0%, 100%)",
  },
  rootDark: {
    maxWidth: 300,
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    overflow: "hidden",
    background: "hsl(209, 23%, 22%)",
  },
  media: {
    height: "180px",
    width: "100%",
    objectFit: "cover",
  },
});

const SingleCard = ({ theme, country }) => {
  const classes = useStyles();
  return (
    <Link
      to={{ pathname: `/${country.name}`, state: { th: theme } }}
      className="link"
    >
      <Card
        className={theme === "light" ? classes.rootLight : classes.rootDark}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={country.flag}
            title={country.name}
          />
          <CardContent>
            <h1 className={theme === "light" ? "tag-light" : "tag-dark"}>
              {country.name}
            </h1>
            <div className="division">
              <span className="tags">
                <h2 className={theme === "light" ? "tag-light" : "tag-dark"}>
                  Population :
                </h2>
                <p className={theme === "light" ? "data-light" : "data-dark"}>
                  &nbsp;{country.population}
                </p>
              </span>
              <span className="tags">
                <h2 className={theme === "light" ? "tag-light" : "tag-dark"}>
                  Region :
                </h2>
                <p className={theme === "light" ? "data-light" : "data-dark"}>
                  &nbsp;{country.region}
                </p>
              </span>
              <span className="tags">
                <h2 className={theme === "light" ? "tag-light" : "tag-dark"}>
                  Capital :
                </h2>
                <p className={theme === "light" ? "data-light" : "data-dark"}>
                  &nbsp;{country.capital}
                </p>
              </span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default SingleCard;
