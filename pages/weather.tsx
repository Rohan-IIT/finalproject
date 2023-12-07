// Weather.tsx
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Get latitude and longitude from localStorage
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

    if (!latitude || !longitude) {
      console.error('Latitude or longitude not found in localStorage');
      return;
    }

    const apiKey = '8c5d1db5f7550dfe849f607f9937218f';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const fetchData = async () => {
      try {
        const response = await fetch(weatherUrl);
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout>
      <h2>Weather Information</h2>
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels Like: {weatherData.main.feels_like}°C</p>
          <p>Min Temperature: {weatherData.main.temp_min}°C</p>
          <p>Max Temperature: {weatherData.main.temp_max}°C</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </Layout>
  );
};

export default Weather;
