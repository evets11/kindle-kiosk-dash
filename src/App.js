import React, { useState } from "react";
import "./App.css";
import BackgroundImages from "./components/background-images/BackgroundImages";
import Icon from "./components/icon/Icon";
import Loader from "./components/loader/Loader";
import Weather from "./components/weather/Weather";
import config from "./Config";

function App() {
  const [showIcons, setShowIcons] = useState(false);
  const [showIconsTimeout, setShowIconsTimeout] = useState(null);
  const [dashIconClicked, setDashIconClicked] = useState(false);
  const [dashIconClickedTimeout, setDashIconClickedTimeout] = useState(null);

  const handleShowIcons = () => {
    clearTimeout(showIconsTimeout);

    if (!showIcons) {
      setShowIcons(true);
      setShowIconsTimeout(
        setTimeout(() => {
          setShowIcons(false);
        }, 60000)
      );
    } else {
      setShowIcons(false);
    }
  };

  const handleIconClicked = () => {
    clearTimeout(dashIconClickedTimeout);
    setDashIconClicked(true);

    // if the redirect doesn't work stop showing the loading icon
    setDashIconClickedTimeout(
      setTimeout(() => {
        setDashIconClicked(false);
        handleShowIcons();
      }, 1000)
    );
  };

  return (
    <div className="App" onClick={handleShowIcons}>
      <BackgroundImages />

      <div className="Dash">
        <Loader display={dashIconClicked} />

        {showIcons && !dashIconClicked && (
          <div>
            <div className="Dash-icons">
              <Weather />
            </div>

            <div className="Dash-icons">
              {config.apps.map((x) => (
                <a key={x.label} href={x.href}>
                  <Icon>
                    <img
                      className="App-icon"
                      src={x.iconUrl}
                      alt={x.label}
                      onClick={handleIconClicked}
                    />
                  </Icon>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
