import React, { Component } from "react";
import Nav from "../common/Nav/Nav";
import Cards from "../Cards/Cards";
import "./Home.css";
import TopBar from "../TopBar/TopBar";
import Loader from "../common/Loader/Loader";

class Home extends Component {
  state = {
    theme: "light",
    countries: [],
    filteredCountries: [],
    searchText: "",
    loading: true,
  };

  performApiCall = async () => {
    this.setState({ loading: true });
    const data = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;"
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    // console.log(data);
    this.setState({ countries: data, filteredCountries: data });
    this.setState({ loading: false });
  };

  componentDidMount = async () => {
    if (this.props.location.state) {
      this.setState({ theme: this.props.location.state.th });
    }
    this.performApiCall();
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
    const { theme, filteredCountries, loading } = this.state;
    const { handleThemeToggle, debounceSearch, handleSortByRegion } = this;

    return (
      <div className={theme === "light" ? "main-light" : "main-dark"}>
        <Nav theme={theme} onThemeChange={handleThemeToggle} />
        <TopBar
          theme={theme}
          onSearch={debounceSearch}
          onSort={handleSortByRegion}
        />
        {!loading ? (
          <Cards theme={theme} countries={filteredCountries} />
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
    );
  }
}

export default Home;
