import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';
import Layout from "../components/Layout";

interface UserDetailsProps {
  user: User | null;
}

const UserDetailsPage: React.FC<UserDetailsProps> = ({ user }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  
  // Check if 'window' is defined (i.e., if the code is running on the client side)
  const cityName = typeof window !== 'undefined' ? localStorage.getItem('city') || '' : '';

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

  useEffect(() => {
    // Fetch city photos when the component mounts
    getCityPhotos(cityName);
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold mt-5">City Photos Page</h1>
      <div id="photoContainer" className="flex flex-wrap gap-4">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.src.original} alt={`City Photo ${photo.id}`} className="rounded w-full w-1/2 lg:w-1/3 xl:w-1/4 object-cover" />
        ))}
      </div>
    </Layout>
  );
};

export default UserDetailsPage;
