// Dashboard.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";// Assuming you have UserData interface in a separate file
import UserData from '../types/index';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { name, city, userData: userDataString } = router.query;
  const userData: UserData | null = userDataString ? JSON.parse(userDataString as string) : null;

  useEffect(() => {
    // You can perform any additional actions or fetch more data based on the user data
    // For example, fetch additional data related to the user ID

    // console.log("User Data:", userData);
  }, [userData]);

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p>User Name: {name}</p>
        <p>City: {city}</p>

        {/* Display fetched user data */}
        {userData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Fetched User Data</h2>
            <p>ID: {userData.id}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
