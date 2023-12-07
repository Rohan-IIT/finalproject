import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface EarthquakeData {
    id: string;
    mag: number;
    place: string;
    time: number;
}

const Earthquake: React.FC = () => {
    const [earthquakeData, setEarthquakeData] = useState<EarthquakeData[]>([]);
    const [timeFrame, setTimeFrame] = useState<string>('');

    useEffect(() => {
        // Get latitude and longitude from localStorage
        const latitude = localStorage.getItem('latitude') || '';
        const longitude = localStorage.getItem('longitude') || '';

        if (!latitude || !longitude) {
            console.error('Latitude or Longitude not found in localStorage');
            return;
        }

        const getEarthquakeData = async (latitude: string, longitude: string) => {
            const startDate = '2016-01-01';
            const endDate = '2022-12-31';
            const minMagnitude = 3.0;
            const maxRadiusKm = 700;

            const apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKm}&minmagnitude=${minMagnitude}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const timeFrame = `${startDate} to ${endDate}`;
                setTimeFrame(timeFrame);
                return data.features.map((feature: any) => ({
                    id: feature.id,
                    mag: feature.properties.mag,
                    place: feature.properties.place,
                    time: feature.properties.time,
                }));
            } catch (error) {
                console.error('Error fetching earthquake data:', error);
                return [];
            }
        };

        const fetchEarthquakeData = async () => {
            try {


                const latitude = localStorage.getItem('latitude') || '';
                const longitude = localStorage.getItem('longitude') || '';

                const earthquakeData = await getEarthquakeData(latitude, longitude);
                setEarthquakeData(earthquakeData);
            } catch (error) {
                console.error('Error fetching earthquake data:', error);
                // Handle errors and display a message to the user
                // alert('Error fetching earthquake data. Please try again.');
            }
        };

        fetchEarthquakeData();
    }, []); // Empty dependency array to run the effect only once

    return (
        <Layout>
            <h2 className="text-xl font-bold mb-4 mt-5">Earthquake Data ({timeFrame}) having magnitude morethan 3.0</h2>
            {earthquakeData.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Magnitude</th>
                            <th className="py-2 px-4 border-b">Location</th>
                            <th className="py-2 px-4 border-b">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earthquakeData.map((data) => (
                            <tr key={data.id}>
                                <td className="py-2 px-4 border-b">{data.mag}</td>
                                <td className="py-2 px-4 border-b">{data.place}</td>
                                <td className="py-2 px-4 border-b">{new Date(data.time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No earthquake data available for the specified location and time range.</p>
            )}
        </Layout>
    );
};

export default Earthquake;
