import { useRouter } from "next/router";
import Layout from "../components/Layout";


// LatLong.tsx
import React, { useEffect } from 'react';

const LatLong: React.FC = () => {
  useEffect(() => {
    // Get city name from localStorage
    const cityName = localStorage.getItem('city');

    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(cityName)}`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          // Handle the case where there are no results for the entered city name
          let errorString = 'No location found for the entered city name. Please try entering a correct name.';
          return;
        }

        // Use the first result from the geocode API
        const firstResult = data[0];

        if (firstResult && firstResult.lat && firstResult.lon) {
          const latitude = firstResult.lat;
          const longitude = firstResult.lon;

          // Display in HTML
          const latLongContainer = document.getElementById('latLong');
          if (latLongContainer) {
            latLongContainer.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
          }

          // Set lat long in localStorage
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);

          console.log(latitude, longitude);
        } else {
          // Handle the case where geocode API response is not as expected
          console.error('Invalid geocode API response');
          // alert('Error getting geolocation data. Please try again.');
        }
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
