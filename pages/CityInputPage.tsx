// CityInputPage.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";

const CityInputPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve name, city, latitude, and longitude from localStorage when the component mounts
    const storedName = localStorage.getItem("name");
    const storedCity = localStorage.getItem("city");
    const storedLatitude = localStorage.getItem("latitude");
    const storedLongitude = localStorage.getItem("longitude");

    if (storedName && storedCity && storedLatitude && storedLongitude) {
      setName(storedName);
      setCity(storedCity);
      setLatitude(parseFloat(storedLatitude));
      setLongitude(parseFloat(storedLongitude));
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set name and city in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("city", city);

    // Set latitude and longitude in localStorage
    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(city)}`;

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

          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());
          // Store latitude and longitude in state
          setLatitude(parseFloat(latitude));
          setLongitude(parseFloat(longitude));

          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        } else {
          console.error('Invalid geocode API response');
        }
      })
      .catch(error => {
        console.error('Error fetching geolocation data:', error);
      });

    // Redirect to the dashboard
    router.push({
      pathname: "/dashboard",
      query: { name, city },
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Enter Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">City:</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter your city"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CityInputPage;
