import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = ({ style }) => {
  return (
    <div style={style}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
