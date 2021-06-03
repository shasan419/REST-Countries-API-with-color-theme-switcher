import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import "./Sort.css";

const BootstrapInput = withStyles(() => ({
  input: {
    borderRadius: 5,
    position: "relative",
    border: "none",
    fontSize: 14,
    padding: "13px",
    background: "none",
    height: "max-content",
    boxShadow: "0 0 8px rgb(0 0 0 / 5%)",
    fontFamily: ["NunitoSans"].join(","),
  },
}))(InputBase);

const Sort = (props) => {
  const { theme, onSort } = props;
  return (
    <FormControl
      variant="outlined"
      className={theme === "light" ? "sort-drop-light" : "sort-drop-dark"}
    >
      <Select
        onChange={(event) => onSort(event.target.value)}
        input={<BootstrapInput />}
        defaultValue="Filter by Region"
      >
        <MenuItem value="Filter by Region">Filter by Region</MenuItem>
        <MenuItem value="Africa">Africa</MenuItem>
        <MenuItem value="Americas">Americas</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Oceania">Oceania</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
