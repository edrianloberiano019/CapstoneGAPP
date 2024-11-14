import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import backgroundImage from '../images/bg.jpg';
import Loading from './Loading';
import { motion } from 'framer-motion';

function RegisteredEducators() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const educatorsList = [];
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.role === 'educator') {
                        educatorsList.push(userData);
                    }
                });
                setUsers(educatorsList);
                setFilteredUsers(educatorsList);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <motion.div className='w-full drop-shadow-lg overflow-hidden'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className='rounded-lg overflow-hidden' style={appStyle}>
                <div className='p-6 flex w-full bg-[#00712d9c] drop-shadow-md'>
                    <div className='flex w-full'>
                        <div className='bg-[#ffffffe8] h-[500px] py-5 px-10 rounded-lg w-full'>
                            <div className='flex justify-between'>
                                <div className='flex justify-center items-center'>
                                    <div className='text-4xl'>Registered Educators</div>
                                </div>
                                <div className='flex'>
                                    <input
                                        className='bg-gray-300 text-2xl h-full focus:outline-none rounded-l-lg px-4 py-1'
                                        placeholder='Search'
                                        type='search'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className='bg-gray-300 h-full px-4 rounded-r-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className='border-t-2 py-1 gap-5 border-b-2 border-solid flex justify-between border-gray-400 mt-6'>
                                <div className='text-2xl w-[20%]'>Name</div>
                                <div className='text-2xl w-[10%]'>Gender</div>
                                <div className='text-2xl w-[35%]'>Address</div>
                                <div className='text-2xl w-[15%]'>Phone no.</div>
                                <div className='text-2xl w-[20%]'>Guardian's Name</div>
                                <div className='text-2xl w-[20%]'>Guardian's Phone</div>
                                <div className='text-2xl w-[20%]'>Password</div>
                            </div>

                            <div>
                                <ul>
                                    {filteredUsers.map((user, index) => (
                                        <li key={index} className='flex gap-5 justify-between py-2'>
                                            <div className='w-[20%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className='w-[10%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.gender}
                                            </div>
                                            <div className='w-[35%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.address}
                                            </div>
                                            <div className='w-[15%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.phone}
                                            </div>
                                            <div className='w-[20%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.emergencyContact.guardianFirstName} {user.emergencyContact.guardianLastName}
                                            </div>
                                            <div className='w-[20%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.emergencyContact.guardianPhone}
                                            </div>
                                            <div className='w-[20%] text-2xl overflow-hidden text-ellipsis'>
                                                {user.password}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default RegisteredEducators;
