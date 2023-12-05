import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../types';

interface UserDetailsProps {
  user: User | null;
}

const UserInput: React.FC<{ onSubmit: (cityName: string) => void }> = ({ onSubmit }) => {
  const [cityName, setCityName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cityName);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Enter City Name:</label>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded btn">
        Get City Photos
      </button>
    </form>
  );
};

const UserDetailsPage: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);

  const getCityPhotos = async (cityName: string) => {
    try {
      const API_KEY = "1ujYwpIHKGdagzt9zZeRAhTbrf7v1HvCC8BiIB8Qd4m2678zdz21MhPr";
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${cityName} city&orientation=landscape&per_page=9&page=1`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      setPhotos(response.data.photos);
    } catch (error) {
      console.error('Error fetching city photos', error);
      setPhotos([]);
    }
  };

  return (
    <div>
      <h1 className="mb-4">City Photos Page</h1>
      <UserInput onSubmit={getCityPhotos} />
      <div id="photoContainer" className="flex flex-wrap">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.src.original} alt={`City Photo ${photo.id}`} className="m-2 rounded" />
        ))}
      </div>
    </div>
  );
};

export default UserDetailsPage;