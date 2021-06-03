import React from "react";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import "./TopBar.css";

const TopBar = ({ theme, onSearch, onSort }) => {
  return (
    <div className={theme === "light" ? "top-bar-light" : "top-bar-dark"}>
      <Search theme={theme} onSearch={onSearch} />
      <Sort theme={theme} onSort={onSort} />
    </div>
  );
};

export default TopBar;
