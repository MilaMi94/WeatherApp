import React, { useState } from "react";
import {
  Fade,
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  Alert,
  Paper,
  Skeleton,
} from "@mui/material";
import api from "../api";
import LogoutButton from "../components/Logout";

const getBackgroundImage = (forecast) => {
  switch (forecast.toLowerCase()) {
    case "clear":
    case "sunny":
      return "https://images.unsplash.com/photo-1650980331974-b6268d3be45f";
    case "clouds":
      return "https://images.unsplash.com/photo-1701197681602-d21c29957ab9";
    case "rain":
    case "drizzle":
      return "https://images.unsplash.com/photo-1493314894560-5c412a56c17c";
    case "thunderstorm":
      return "https://images.unsplash.com/photo-1516490981167-dc990a242afe";
    case "snow":
      return "https://images.unsplash.com/photo-1491002052546-bf38f186af56";
    case "mist":
    case "fog":
      return "https://images.unsplash.com/photo-1495166799754-7cfa1a4c6bb8";
    default:
      return "https://images.unsplash.com/photo-1630260667842-830a17d12ec9";
  }
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [lastForecast, setLastForecast] = useState("cloudy");
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (city.trim()) {
      setError("");
      setWeather(null);
      setHasSearched(true);
      setLoading(true); // Start loading
      try {
        const response = await api.post("/weather/", { city });
        const data = response.data;
        setWeather(data);
        setLastForecast(data.main);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch weather data. Try again.");
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  const backgroundImage = getBackgroundImage(lastForecast);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", color: "#fff" }}>
      {/* Background image with opacity overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.2)", // semi-transparent overlay
          zIndex: -1,
        }}
      />

      {/* Main content above overlays */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Box
          component="header"
          sx={{
            height: "64px",
            px: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            🌤️ WEATHER APP Django&React
          </Typography>
          <LogoutButton />
        </Box>

        {/* Main Grid Content */}
        <Grid container sx={{ flexGrow: 1 }}>
          {/* Left Panel */}
          <Grid
            width="50%"
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 4,
            }}
          >
            {loading ? (
              <>
                <Skeleton variant="text" width={120} height={80} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Skeleton variant="text" width={100} height={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              </>
            ) : weather ?
              (
                <>
                  <Typography variant="h1" sx={{ fontWeight: "bold", mb: 2 }}>
                    {city}
                  </Typography>
                  <Typography variant="h3" sx={{ color: "#f5f5f5" }}>
                    {weather.temp}
                  </Typography>
                </>
              ) : !hasSearched ? (
                <Typography variant="h4" sx={{ opacity: 0.8 }}>
                  Enter a city to get started!
                </Typography>
              ) : null}
          </Grid>

          {/* Right Panel */}
          <Grid
            item
            width="50%"
            xs={12}
            md={6}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                borderRadius: 3,
                color: "white",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // prevent page refresh
                  handleSearch();
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search for a city..."
                  variant="outlined"
                  value={city}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCity(value);
                    if (value.trim() === "") {
                      setWeather(null);
                      setError("");
                    }
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 4,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      input: { color: "#fff" },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                />
              </form>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}


              {loading ? (
                <Card sx={{ mt: 3, backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <CardContent>
                    <Skeleton width="60%" height={30} sx={{ mb: 1 }} />
                    <Skeleton width="80%" height={30} sx={{ mb: 1 }} />
                    <Skeleton width="40%" height={30} sx={{ mb: 1 }} />
                    <Skeleton width="70%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              ) : weather && (
                <Fade in={!loading}>
                  <Card sx={{ mt: 3, backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <CardContent>
                      <Typography gutterBottom>
                        <strong>Country:</strong> {weather.country_code}
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Coordinates:</strong> {weather.coordinate}
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Pressure:</strong> {weather.pressure}
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Humidity:</strong> {weather.humidity}
                      </Typography>
                      <Typography
                        gutterBottom
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <strong>Forecast:</strong>&nbsp;
                        {weather.main}
                        <img
                          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                          alt="weather icon"
                          style={{ width: 40, marginLeft: 10 }}
                        />
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Description:</strong> {weather.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
