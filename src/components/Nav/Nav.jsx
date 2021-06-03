import React from "react";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = (props) => {
  const { theme, onThemeChange } = props;
  return (
    <div className="content">
      <div className={theme === "dark" ? "nav-items-dark" : "nav-items-light"}>
        <Link to={{ pathname: "/", state: { th: theme } }} className="Logo">
          <h1
            className={theme === "dark" ? "logo-text-dark" : "logo-text-light"}
          >
            Where in the world?
          </h1>
        </Link>
        <div>
          {theme === "dark" ? (
            <p
              className="mode-text-dark"
              onClick={() => {
                onThemeChange("light");
              }}
            >
              <Brightness7Icon
                style={{ fontSize: 18, verticalAlign: "middle" }}
              />{" "}
              Light Mode
            </p>
          ) : (
            <p
              className="mode-text-light"
              onClick={() => {
                onThemeChange("dark");
              }}
            >
              <Brightness4Icon
                style={{
                  fontSize: 18,
                  verticalAlign: "middle",
                  color: "var(--light-text)",
                }}
              />{" "}
              Dark Mode
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
