// pages/user-details.tsx
import { useState } from 'react';
import axios from 'axios';
import { User } from '../types';
import styles from '../styles/Home.module.css'

interface UserDetailsProps {
    user: User | null;
}

// Client side rendering
const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className='text-center'>
            <h3 className="text-xl font-semibold mb-4 ">Student Details</h3>
            {user ? (

                <div className="flex items-center justify-center bg-gray-100">
                    <table className="min-w-full bg-white border rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>

                                <td className="py-2 px-4 border-b">{user.address.street}, {user.address.city}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>



            ) : (

                <div className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4">
                    <p>Student not found, please enter number between 1-10</p>
                </div>
            )}
        </div>
    );
};

// Client side rendering
const UserInput: React.FC<{ onSubmit: (userId: number) => void }> = ({ onSubmit }) => {
    const [userId, setUserId] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(userId);
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-1/2 mb-4">
            <label className="block text-sm font-medium text-gray-700 text-center">Enter Student ID:</label>
            <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value, 10))}
                className="mt-1 p-2 border rounded"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded btn">
                Get Student Details
            </button>
        </form>

    );
};

const UserDetailsPage: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);

    // Server side rendering

    const getUserDetails = async (userId: number) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching Student details', error);
            setUserData(null);
        }
    };

    return (
        <div className='items-center bg-gray-100 text-center'>
            <div className='bg-white p-8 rounded-md shadow-lg'>
                <h1 className="text-2xl font-semibold mb-6">Student Details Page</h1>
                <UserInput onSubmit={getUserDetails} />
                <UserDetails user={userData} />
            </div>
        </div>
    );
};

export default UserDetailsPage;
