import PropTypes from "prop-types";
import React from "react";
import "./CameraFeed.css";

function CameraFeed({ url }) {
  return (
    <div className="CameraContainer">
      <iframe className="CameraIframe" title="Camera" src={url} frameBorder="0" />
    </div>
  );
}

CameraFeed.propTypes = {
  url: PropTypes.string,
};

export default CameraFeed;
