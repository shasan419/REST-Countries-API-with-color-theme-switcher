import React from "react";

const Content = (props) => {
  const { theme, spanText, pText } = props;
  return (
    <p className={theme === "light" ? "text-light" : "text-dark"}>
      <span className={theme === "light" ? "span-light" : "span-dark"}>
        {spanText}{" "}
      </span>
      {pText}
    </p>
  );
};

export default Content;
