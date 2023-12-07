// CityInputPage.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import UserData from "../types/index";

const CityInputPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Retrieve name and city from localStorage when the component mounts
    const storedName = localStorage.getItem("name");
    const storedCity = localStorage.getItem("city");

    if (storedName && storedCity) {
      setName(storedName);
      setCity(storedCity);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Fetch user data from JSONPlaceholder based on the provided name
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`);
      const users = await response.json();

      // Assuming the first user in the list is the desired one
      const user = users[0];

      // Set user data for displaying in the dashboard
      setUserData(user);

      // Store name and city in localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("city", city);

      // Pass user data to dashboard
      router.push({
        pathname: "/dashboard",
        query: { name, city, userData: JSON.stringify(user) },
      });


    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    // Reset user data when the component unmounts or is re-rendered
    return () => setUserData(null);
  }, []);

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
