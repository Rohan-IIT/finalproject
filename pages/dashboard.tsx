// Dashboard.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import UserData from '../types/index';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { userData: userDataString } = router.query;
  const userData: UserData | null = userDataString ? JSON.parse(userDataString as string) : null;

  // Fetch user and city from localStorage
  const storedName = localStorage.getItem("name") || 'Guest';
  const storedCity = localStorage.getItem("city") || 'Unknown City';

  useEffect(() => {
    // You can perform any additional actions or fetch more data based on the user data
    // For example, fetch additional data related to the user ID
    // console.log("User Data:", userData);
  }, [userData]);

  return (
    <Layout>
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Hello, {storedName}! <br />Welcome to {storedCity}</h2>


        {/* Display fetched user data */}
        {userData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Fetched User Data</h2>
            <p className="text-lg">ID: {userData.id}</p>
            <p className="text-lg">Name: {userData.name}</p>
            <p className="text-lg">Email: {userData.email}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
