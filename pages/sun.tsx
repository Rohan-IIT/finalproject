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
     <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sunrise/Sunset Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Sunrise</th>
              <th className="py-2 px-4 border">Sunset</th>
              <th className="py-2 px-4 border">Dawn</th>
              <th className="py-2 px-4 border">Dusk</th>
              <th className="py-2 px-4 border">Day Length</th>
              <th className="py-2 px-4 border">Solar Noon</th>
              <th className="py-2 px-4 border">Time Zone</th>
            </tr>
          </thead>
          <tbody>
            {sunriseData.map((data) => (
              <tr key={data.date} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{data.date}</td>
                <td className="py-2 px-4 border">{data.sunrise}</td>
                <td className="py-2 px-4 border">{data.sunset}</td>
                <td className="py-2 px-4 border">{data.dawn}</td>
                <td className="py-2 px-4 border">{data.dusk}</td>
                <td className="py-2 px-4 border">{data.day_length}</td>
                <td className="py-2 px-4 border">{data.solar_noon}</td>
                <td className="py-2 px-4 border">{data.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default Sunset;
