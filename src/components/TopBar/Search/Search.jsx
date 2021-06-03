import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";

const Search = ({ theme, onSearch }) => {
  return (
    <div>
      <div className={theme === "light" ? "search-light" : "search-dark"}>
        <SearchIcon
          style={{
            color: theme === "light" ? "var(--light-text)" : "hsl(0, 0%, 100%)",
            margin: "0 10px",
          }}
        />
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
