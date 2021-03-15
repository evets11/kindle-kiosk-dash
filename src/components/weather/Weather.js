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
        `http://api.openweathermap.org/data/2.5/onecall?lat=${env.OPEN_WEATHER_LAT}&lon=${env.OPEN_WEATHER_LON}&units=metric&exclude=minutely,hourly,alerts&appid=${env.OPEN_WEATHER_API_KEY}`
      );
      const decoded = await res.json();
      await sleep(500);
      setWeather(decoded);
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return (
      <Icon>
        <Loader />
      </Icon>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <WeatherIcon
        icon={weather.current.weather[0].icon}
        description={weather.current.weather[0].description}
        temp={weather.current.temp}
        feelsLike={weather.current.feels_like}
        max={weather.daily[0].temp.max}
        min={weather.daily[0].temp.min}
      />

      <WeatherIcon
        icon={weather.daily[1].weather[0].icon}
        description={weather.daily[1].weather[0].description}
        max={weather.daily[1].temp.max}
        min={weather.daily[1].temp.min}
      />
    </div>
  );
}

function WeatherIcon({ icon, description, temp, feelsLike, max, min }) {
  return (
    <Icon style={{ alignItems: "flex-start" }}>
      <div className="Container">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Today's weather"
        />

        <div>
          <div className="Title">{capitalise(description)}</div>

          <div>
            {temp && (
              <React.Fragment>
                Current: {Math.round(temp)} &#8451;
                <br />
              </React.Fragment>
            )}
            {temp && (
              <React.Fragment>
                Feels Like: {Math.round(feelsLike)} &#8451;
                <br />
              </React.Fragment>
            )}
            High: {Math.round(max)} &#8451;
            <br />
            Low: {Math.round(min)} &#8451;
          </div>
        </div>
      </div>
    </Icon>
  );
}

export default Weather;
