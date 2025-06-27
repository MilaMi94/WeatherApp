import React, { useState } from "react";
import api from "../api.js";
import LogoutButton from "../components/Logout.jsx";
import "../styles/Home.css";

const getBackgroundImage = (forecast) => {
  switch (forecast.toLowerCase()) {
    case "clear":
    case "sunny":
      return "https://images.unsplash.com/photo-1622278647429-71bc97e904e8"; // sunny
    case "clouds":
      return "https://images.unsplash.com/photo-1701197681602-d21c29957ab9"; // cloudy
    case "rain":
    case "drizzle":
      return "https://images.unsplash.com/photo-1493314894560-5c412a56c17c"; // rain
    case "thunderstorm":
      return "https://images.unsplash.com/photo-1516490981167-dc990a242afe"; // storm
    case "snow":
      return "https://images.unsplash.com/photo-1491002052546-bf38f186af56"; // snow
    case "mist":
    case "fog":
      return "https://images.unsplash.com/photo-1495166799754-7cfa1a4c6bb8"; // fog
    default:
      return "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"; // default cloudy
  }
};


export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [lastForecast, setLastForecast] = useState("cloudy"); // keep last forecast
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter" && city.trim()) {
      setError("");
      setWeather(null);

      try {
        // Your backend API endpoint here
        const response = await api.post("/weather/", { city });
        const data = response.data;
        setWeather(data);
        setLastForecast(data.main);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch weather data. Try again."
        );
      }
    }
  };

  const backgroundImage = getBackgroundImage(lastForecast);

  return (
    <><header>
      <h2>Weather app</h2>
      <LogoutButton className="logout-container" />
    </header>
      <div className="home-container"
        style={{
          background: `url(${backgroundImage}) no-repeat center center / cover`,
          transition: "background-image 0.6s ease-in-out"
        }}>


        <div className="left-panel">
          {weather && (

            <><h1>{city}</h1><h2>{weather.temp}</h2></>
          )}


        </div>

        <div className="right-panel">
          <div className="search-section">
            <input
              type="text"
              placeholder="Choose Your City ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleSearch}
              className="search-input" />
          </div>

          {error && <div className="error-message">{error}</div>}

          {weather && (
            <div className="weather-card">
              <h4>
                <span>Country Code:</span> {weather.country_code}
              </h4>
              <h4>
                <span>Coordinates [X,Y]:</span> {weather.coordinate}
              </h4>
              <h4>
                <span>Temperature (°C):</span> {weather.temp}
              </h4>
              <h4>
                <span>Pressure:</span> {weather.pressure}
              </h4>
              <h4>
                <span>Humidity:</span> {weather.humidity}
              </h4>
              <h4>
                <span>Forecast:</span> 
                <div> 
                {weather.main}{" "}
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="Weather icon"
                  style={{ width: "50px", verticalAlign: "middle", marginLeft: "10px" }} />
                  </div>
              </h4>
              <h4>
                <span>Description:</span> {weather.description}
              </h4>
            </div>
          )}
        </div>
      </div></>
  );
}