import { useRouter } from "next/router";
import Layout from "../components/Layout";
// Sunset.tsx
import React, { useEffect, useState } from 'react';

interface SunriseSunsetData {
  date: string;
  sunrise: string;
  sunset: string;
  dawn: string;
  dusk: string;
  day_length: string;
  solar_noon: string;
  timezone: string;
}

const Sunset: React.FC = () => {
  const [sunriseData, setSunriseData] = useState<SunriseSunsetData[]>([]);

  useEffect(() => {
    // Get latitude and longitude from localStorage
    const latitude = localStorage.getItem('latitude') || '';
    const longitude = localStorage.getItem('longitude') || '';

    if (!latitude || !longitude) {
      console.error('Latitude or Longitude not found in localStorage');
      return;
    }

    const getSunriseSunsetData = async (latitude: string, longitude: string, date: string) => {
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return {
          date,
          ...data.results,
        };
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error fetching sunrise/sunset data');
      }
    };

    const todaysDate = new Date();
    const todaysDateStr = todaysDate.toISOString().split('T')[0];

    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(todaysDate);
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0];
    });

    const fetchSunriseData = async () => {
      try {
        const todayData = await getSunriseSunsetData(latitude, longitude, todaysDateStr);
        const next7DaysData = await Promise.all(
          next7Days.map((date) => getSunriseSunsetData(latitude, longitude, date))
        );
        setSunriseData([todayData, ...next7DaysData]);
      } catch (error) {
        console.error('Error fetching sunrise/sunset data:', error);
        // Handle errors and display a message to the user
        // alert('Error fetching sunrise/sunset data. Please try again.');
      }
    };

    fetchSunriseData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout>
      <h2>Sunrise/Sunset Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Dawn</th>
            <th>Dusk</th>
            <th>Day Length</th>
            <th>Solar Noon</th>
            <th>Time Zone</th>
          </tr>
        </thead>
        <tbody>
          {sunriseData.map((data) => (
            <tr key={data.date}>
              <td>{data.date}</td>
              <td>{data.sunrise}</td>
              <td>{data.sunset}</td>
              <td>{data.dawn}</td>
              <td>{data.dusk}</td>
              <td>{data.day_length}</td>
              <td>{data.solar_noon}</td>
              <td>{data.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Sunset;
