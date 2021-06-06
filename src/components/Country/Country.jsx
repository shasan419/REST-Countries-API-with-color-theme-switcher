import React, { Component } from "react";
import Nav from "../common/Nav/Nav";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./Country.css";
import Details from "./Details/Details";
import Loader from "../common/Loader/Loader";
import { config } from "./../../App";
import ThemeContext from "../../context/themeContext";

class Country extends Component {
  state = {
    country: [],
    borders: [],
    loading: true,
  };

  performApiCall = async (name) => {
    this.setState({ loading: true });
    const res = await fetch(
      `${config.endpoint}/name/${name}?fullText=true&fields=name;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;flag;nativeName;`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    this.setState({ country: res[0] });

    const { country } = this.state;
    // console.log(country);
    if (country.borders && country.borders.length !== 0) {
      const resBor = await fetch(
        `${config.endpoint}/alpha/?codes=${country.borders.join(
          ";"
        )}&fields=name;`
      )
        .then((res) => res.json())
        .catch((e) => console.log(e));
      //   console.log(resBor);
      this.setState({ borders: resBor });
    }
    this.setState({ loading: false });
  };

  componentDidMount = () => {
    // console.log(this.props.match.params.name);
    this.performApiCall(this.props.match.params.name);
  };

  render() {
    const { borders, country, loading } = this.state;
    const { performApiCall } = this;
    return (
      <ThemeContext.Consumer>
        {(themeContext) => (
          <div
            className={
              themeContext.theme === "light" ? "main-light" : "main-dark"
            }
          >
            <Nav
              theme={themeContext.theme}
              onThemeChange={themeContext.onThemeChange}
            />
            {!loading ? (
              <div className="container">
                <Link to={{ pathname: "/" }} className="Link">
                  {" "}
                  <div
                    className={
                      themeContext.theme === "light" ? "btn-light" : "btn-dark"
                    }
                  >
                    <KeyboardBackspaceIcon
                      style={{
                        color:
                          themeContext.theme === "light"
                            ? "var(--light-text)"
                            : "var(--dark-text)",
                      }}
                    />
                    Back
                  </div>
                </Link>
                <Details
                  theme={themeContext.theme}
                  country={country}
                  borders={borders}
                  onChange={performApiCall}
                />
              </div>
            ) : (
              <Loader
                style={{
                  display: "flex",
                  height: "80vh",
                  width: "100vw",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Country;
