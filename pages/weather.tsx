import Layout from "../components/Layout";
import React, { useEffect, useState } from 'react';

interface CityWeatherData {
  query: string;
  timezone: string;
  temperature: number | undefined;
  windSpeed: number | undefined;
  currentTime: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<CityWeatherData[]>([]);

  useEffect(() => {
    // Get timezone from localStorage
    const timezone = localStorage.getItem('city');

    if (!timezone) {
      console.error('Timezone not found in localStorage');
      return;
    }

    const getCityWeather = async (timezone: string) => {
      const weatherUrl = `http://api.weatherstack.com/current?access_key=f536d0223f2c50e88790a3efcbb2600d&query=${timezone}`;

      try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherAPI = await weatherResponse.json();
        const currentTemperature = weatherAPI.current?.temperature;
        const windSpeed = weatherAPI.current?.wind_speed;

        return {
          temperature: currentTemperature,
          windSpeed,
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return {
          temperature: undefined,
          windSpeed: undefined,
        };
      }
    };

    const fetchWeatherData = async () => {
      try {
        const weather = await getCityWeather(timezone);

        if (weather.temperature !== undefined && weather.windSpeed !== undefined) {
          setWeatherData([
            {
              query: 'YourCity', // Replace with a meaningful query
              timezone,
              temperature: weather.temperature,
              windSpeed: weather.windSpeed,
              currentTime: new Date().toLocaleString(), // Use local time as a fallback
            },
          ]);
        } else {
          console.error('Invalid or missing weather data:', weather);
          // Handle the case when temperature or windSpeed is not available
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle the case when the API request fails
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout>
      <h2>City Weather Data</h2>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Timezone</th>
            <th>Temperature</th>
            <th>Wind Speed</th>
            <th>Current Time</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data) => (
            <tr key={data.timezone}>
              <td>{data.query}</td>
              <td>{data.timezone}</td>
              <td>{data.temperature} °C</td>
              <td>{data.windSpeed} m/s</td>
              <td>{data.currentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Weather;
