import PropTypes from "prop-types";
import React from "react";
import "./Icon.css";

function Icon({style, children}) {
  return (
    <div className="Icon" style={{ ...style }}>
      {children}
    </div>
  );
}

Icon.propTypes = {
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};

export default Icon;
