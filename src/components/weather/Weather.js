import React, { useEffect, useState } from "react";
import Icon from "../icon/Icon";
import Loader from "../loader/Loader";
import "./Weather.css";
import env from "react-dotenv";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const capitalise = (sentence) => {
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

function Weather() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=${env.OPEN_WEATHER_API_KEY}`
      );
      const decoded = await res.json();
      await sleep(500);
      setWeather(decoded);
    };

    fetchWeather();
  }, []);

  return (
    <Icon>
      {weather ? (
        <div className="Container">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather"
          />

          <div>
            <div className="Title">
              {capitalise(weather.weather[0].description)}
            </div>

            <div className="Info-container">
              <div>
                Current: {weather.main.temp} &#8451;
                <br />
                Feels Like: {weather.main.feels_like} &#8451;
              </div>

              <div>
                High: {weather.main.temp_max} &#8451;
                <br />
                Low: {weather.main.temp_min} &#8451;
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Icon>
  );
}

export default Weather;
