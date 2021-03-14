import { useEffect, useState } from "react";
import "./App.css";
import config from './Config'

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(1);
  const [showIcons, setShowIcons] = useState(false);
  const [showIconsTimeout, setShowIconsTimeout] = useState(null)

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

  const handleShowIcons = async () => {
    clearTimeout(showIconsTimeout)

    if (!showIcons) {
      setShowIcons(true);
      setShowIconsTimeout(setTimeout(() => {setShowIcons(false)}, 5000))
    } else {
      setShowIcons(false);
    }
  };

  return (
    <div
      className="App"
      onClick={handleShowIcons}
      style={{ backgroundImage: `url("${config.images[imageIndex]}")` }}
    >
      {showIcons && (
        <div className="Dash">
          <div className="Dash-items">
            {config.apps.map((x) => (
              <a key={x.label} href={x.href}>
                <img className="Dash-icon" src={x.iconUrl} alt={x.label} />
              </a>
            ))}
          </div>
        </div>
      )}

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
