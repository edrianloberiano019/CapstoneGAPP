import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import backgroundImage from '../images/bg.jpg';
import Loading from './Loading';
import {motion} from 'framer-motion'

function RegisteredEducators() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const educatorsList = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.role === 'student') {
                    educatorsList.push(userData);
                }
            });
            setUsers(educatorsList);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    

    if (loading) {
        return <Loading />;
    }

    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <motion.div className='w-full drop-shadow-lg overflow-hidden'
            initial={{ opacity: 0, x: 100 }}  
            animate={{ opacity: 1, x: 0 }}   
            transition={{ duratiom: 0.2  }}
        
        >
            <div className='rounded-lg overflow-hidden' style={appStyle}>
                <div className='p-6 flex w-full bg-[#00712d9c] drop-shadow-md'>
                    <div className='flex w-full'>
                        <div className='bg-[#ffffffe8] h-[500px] py-5 px-10 rounded-lg w-full overflow-auto'>
                            <div className='flex justify-between'>

                                <div className='flex justify-center content-center items-center'>
                                    <div className='text-4xl'>Registered Students</div>

                                </div>
                                <div className=''>
                                    <input
                                        className='bg-gray-300 text-2xl focus:outline-none rounded-l-lg px-4 py-1'
                                        placeholder='Search'
                                        type='search'
                                    />
                                    <button className='justify-center content-center align-middle bg-gray-300 h-full px-4 rounded-r-lg'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-7"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className='border-t-2 pt-1 border-solid flex justify-between border-black mt-6'>
                                <div className='text-2xl w-[20%]'>Name</div>
                                <div className='text-2xl w-[10%]'>Gender</div>
                                <div className='text-2xl w-[35%]'>Address</div>
                                <div className='text-2xl w-[15%]'>Phone no.</div>
                                <div className='text-2xl w-[20%]'>Guardian's Name</div>
                                <div className='text-2xl w-[20%]'>Guardian's Phone</div>
                                <div className='text-2xl w-[20%]'>Guardian's Landline</div>
                                <div className='text-2xl w-[20%]'>Password</div>

                            </div>

                            <div>
                                <ul>
                                    {users.map((user, index) => (
                                        <li key={index} className='flex justify-between py-2'>
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
                                                {user.emergencyContact.guardianLandline}
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
