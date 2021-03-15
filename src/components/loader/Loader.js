import PropTypes from "prop-types";
import React from "react";

function Loader({ display }) {
  return (
    <img
      height="100"
      width="100"
      src="/loader.svg"
      alt="Loader"
      style={{ display: display ? "block" : "none" }}
    />
  );
}

Loader.propTypes = {
  display: PropTypes.bool,
};

Loader.defaultProps = {
  display: true,
};

export default Loader;
