import { useRouter } from "next/router";
import Layout from "../components/Layout";

// /pages/LatLong.tsx
import React, { useEffect } from 'react';

const LatLong: React.FC = () => {
  useEffect(() => {
    // Get cityName from localStorage
    const cityName = localStorage.getItem('city');

    if (!cityName) {
      console.error('City name not found in localStorage');
      return;
    }

    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(cityName)}`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          // Handle the case where there are no results for the entered city name
          let errorString = 'No location found for the entered city name. Please try entering a correct name.';
          console.error(errorString);
          // Handle the error as needed, such as displaying it to the user
          return;
        }

        // Use the first result from the geocode API
        const firstResult = data[0];

        if (firstResult && firstResult.lat && firstResult.lon) {
          const latitude = firstResult.lat;
          const longitude = firstResult.lon;

          // Store latitude and longitude in localStorage
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);

          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        } else {
          // Handle the case where geocode API response is not as expected
          console.error('Invalid geocode API response');
          // Handle the error as needed, such as displaying it to the user
        }
      })
      .catch(error => {
        console.error('Error fetching geolocation data:', error);
        // Handle errors and display a message to the user
        // alert('Error getting geolocation data. Please try again.');
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout>
      <h2>Latitude and Longitude</h2>
      <div id="latLong"></div>
    </Layout>
  );
};

export default LatLong;
