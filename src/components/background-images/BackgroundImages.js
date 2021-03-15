import React, { useEffect, useState } from "react";
import "./BackgroundImages.css";
import config from "../../Config";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function BackgroundImages() {
  const [imageIndex, setImageIndex] = useState(-1);
  const [imageFade, setImageFade] = useState(1);

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

  return (
    <React.Fragment>
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

      <div
        className="Image-fade"
        style={{
          opacity: imageFade,
          transition: `opacity ${config.imageTransitionMs}ms ease-in-out`,
        }}
      />
    </React.Fragment>
  );
}

export default BackgroundImages;
