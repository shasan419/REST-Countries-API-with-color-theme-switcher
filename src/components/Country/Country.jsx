import React, { Component } from "react";
import Nav from "../common/Nav/Nav";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./Country.css";
import Details from "./Details/Details";
import Loader from "../common/Loader/Loader";

class Country extends Component {
  state = {
    theme: this.props.location.state.th,
    country: [],
    borders: [],
    loading: true,
  };

  performApiCall = async () => {
    this.setState({ loading: true });
    const name = this.props.match.params.name;
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${name}?fullText=true&fields=name;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;flag;nativeName;`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    this.setState({ country: res[0] });

    const { country } = this.state;
    // console.log(country);
    if (country.borders && country.borders.length !== 0) {
      const resBor = await fetch(
        `https://restcountries.eu/rest/v2/alpha/?codes=${country.borders.join(
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

  handleThemeToggle = (val) => {
    let root = document.getElementsByTagName("body");
    if (val === "light") {
      root[0].setAttribute("style", "background:hsl(0, 0%, 98%);");
    } else {
      root[0].setAttribute("style", "background:hsl(207, 26%, 17%)");
    }

    this.setState({ theme: val });
  };

  componentDidMount = () => {
    this.performApiCall();
  };

  render() {
    const { theme, borders, country, loading } = this.state;
    const { handleThemeToggle } = this;
    return (
      <div className={theme === "light" ? "main-light" : "main-dark"}>
        <Nav theme={theme} onThemeChange={handleThemeToggle} />
        {!loading ? (
          <div className="container">
            <Link to={{ pathname: "/", state: { th: theme } }} className="Link">
              {" "}
              <div className={theme === "light" ? "btn-light" : "btn-dark"}>
                <KeyboardBackspaceIcon
                  style={{
                    color:
                      theme === "light"
                        ? "var(--light-text)"
                        : "var(--dark-text)",
                  }}
                />
                Back
              </div>
            </Link>
            <Details theme={theme} country={country} borders={borders} />
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
    );
  }
}

export default Country;
