import React, { useEffect, useState } from "react";
import "./App.css";
import config from "./Config";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(1);
  const [showIcons, setShowIcons] = useState(false);
  const [showIconsTimeout, setShowIconsTimeout] = useState(null);
  const [dashIconClicked, setDashIconClicked] = useState(false);
  const [dashIconClickedTimeout, setDashIconClickedTimeout] = useState(null);

  useEffect(() => {
    const handleImageIndex = async () => {
      setImageFade(0);
      setImageIndex((imageIndex) => {
        const newImageIndex = imageIndex + 1;
        return newImageIndex >= config.images.length ? 0 : newImageIndex;
      });

      await sleep(config.displayImageForMs);
      setImageFade(1);
      await sleep(config.imageTransitionMs * 1.1);
      handleImageIndex();
    };

    handleImageIndex();
  }, []);

  const handleShowIcons = () => {
    clearTimeout(showIconsTimeout);

    if (!showIcons) {
      setShowIcons(true);
      setShowIconsTimeout(
        setTimeout(() => {
          setShowIcons(false);
        }, 5000)
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
      }, 10000)
    );
  };

  return (
    <div className="App" onClick={handleShowIcons}>
      {config.images.map((x, index) => (
        <div
          key={`background-image-${index}`}
          className="Background-image"
          style={{
            backgroundImage: `url("${x}")`,
            display: index === imageIndex ? "block" : "none",
          }}
        ></div>
      ))}

      <div className="Dash">
        <img
          src="/loader.svg"
          alt="Loader"
          style={{ display: dashIconClicked ? "block" : "none" }}
        />

        {showIcons && !dashIconClicked && (
          <div className="Dash-items">
            {config.apps.map((x) => (
              <a key={x.label} href={x.href}>
                <img
                  className="Dash-icon"
                  src={x.iconUrl}
                  alt={x.label}
                  onClick={handleIconClicked}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      <div
        className="Image-fade"
        style={{
          opacity: imageFade,
          transition: `opacity ${config.imageTransitionMs}ms ease-in-out`,
        }}
      />
    </div>
  );
}

export default App;
