import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";

const LatLong: React.FC = () => {
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);

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
                    let errorString = 'No location found for the entered city name. Please try entering a correct name.';
                    console.error(errorString);
                    return;
                }

                const firstResult = data[0];

                if (firstResult && firstResult.lat && firstResult.lon) {
                    const latitude = firstResult.lat;
                    const longitude = firstResult.lon;

                    localStorage.setItem('latitude:', latitude);
                    localStorage.setItem('longitude:', longitude);
                    // Store latitude and longitude in state
                    setLatitude(latitude);
                    setLongitude(longitude);

                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                } else {
                    console.error('Invalid geocode API response');
                }
            })
            .catch(error => {
                console.error('Error fetching geolocation data:', error);
            });
    }, []); // Empty dependency array to run the effect only once

    return (
        <Layout>

            <div className="container mx-auto mt-8 text-center">

                {latitude && longitude ? (
                    <div id="latLong">
                        <h2 className="text-3xl font-bold mb-4">Latitude  {latitude} and Longitude {longitude} of the city.</h2>
                    </div>
                ) : (
                    <p>Latitude and Longitude data not available.</p>
                )}
            </div>


        </Layout>
    );
};

export default LatLong;