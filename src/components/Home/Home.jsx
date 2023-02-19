import React, { Component } from "react";
import Nav from "../common/Nav/Nav";
import Cards from "../Cards/Cards";
import "./Home.css";
import TopBar from "../TopBar/TopBar";
import Loader from "../common/Loader/Loader";
import { config } from "./../../App";
import ThemeContext from "./../../context/themeContext";

class Home extends Component {
  static contextType = ThemeContext;
  state = {
    // theme: "light",
    countries: [],
    filteredCountries: [],
    searchText: "",
    loading: true,
  };

  performApiCall = async () => {
    this.setState({ loading: true });
    const data = await fetch(
      `${config.endpoint}/all?fields=name,population,region,capital,flag`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    console.log(data);
    this.setState({ countries: data, filteredCountries: data });
    this.setState({ loading: false });
  };

  componentDidMount = async () => {
    this.performApiCall();
  };

  debounceSearch = (val) => {
    this.setState({ loading: true });

    // console.log(val);
    const later = () => {
      clearTimeout(this.debounceTimeout);
      this.handleSearch(val);
    };

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(later, 300);
  };

  handleSearch = (text) => {
    if (text !== "") {
      const items = this.state.countries.filter((item) => {
        if (item.name.toLowerCase().includes(text.toLowerCase())) {
          return item;
        }
      });
      this.setState({
        filteredCountries: items,
      });
    } else {
      this.setState({ filteredCountries: [...this.state.countries] });
    }
    this.setState({ loading: false });
  };

  handleSortByRegion = (val) => {
    this.setState({ loading: true });
    if (val !== "Filter by Region") {
      const items = this.state.countries.filter((item) => {
        if (item.region.toLowerCase().includes(val.toLowerCase())) {
          return item;
        }
      });
      this.setState({
        filteredCountries: items,
      });
    } else {
      this.setState({ filteredCountries: [...this.state.countries] });
    }
    this.setState({ loading: false });
  };

  render() {
    const { filteredCountries, loading } = this.state;
    const { debounceSearch, handleSortByRegion } = this;

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
            <TopBar
              theme={themeContext.theme}
              onSearch={debounceSearch}
              onSort={handleSortByRegion}
            />
            {!loading ? (
              <Cards theme={themeContext.theme} countries={filteredCountries} />
            ) : (
              <Loader
                style={{
                  display: "flex",
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

export default Home;
