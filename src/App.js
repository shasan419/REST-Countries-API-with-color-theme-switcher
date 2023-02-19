import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";
import urlConfig from "./urlConfig.json";
import ThemeContext from "./context/themeContext";

export const config = {
  endpoint: `${urlConfig.backendUrl}`,
};

class App extends Component {
  state = {
    theme: "light",
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

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          onThemeChange: this.handleThemeToggle,
        }}
      >
        <Switch>
          <Route path="/:name" render={(props) => <Country {...props} />} />
          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeContext.Provider>
    );
  }
}

export default App;
