import React, { useState } from 'react';
import Navbar from './navbar';
import Carousel from './carousel';
import Image1 from '../images/Image1.jpg';
import Image2 from '../images/Image2.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from './background-beams-with-collision';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from "react-toastify";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LoadingButtons from './LoadingButtons';

function ForgotPassword() {
    const images = [Image1, Image2];
    const [isInputFocused, setInputFocused] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accountFound, setAccountFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState(true);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    
    };
    

    const handleSearchAccount = async (e) => {
        e.preventDefault();
        setLoading(true);

        const usersRef = collection(db, 'users');

        try {
            const emailQuery = query(usersRef, where('email', '==', searchInput));

            const querySnapshotEmail = await getDocs(emailQuery);

            let userFound = null;

            if (!querySnapshotEmail.empty) {
                userFound = querySnapshotEmail.docs[0].data();
            }

            if (userFound) {
                setAccountFound(true);
                setFirstName(userFound.firstName);
                setLastName(userFound.lastName);
                console.log('Account found:', searchInput);
            } else {
                setAccountFound(false);
                setFirstName('');
                toast.error('Email not found!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
            }

        } catch (error) {
            console.error("Error checking account:", error);
        } finally {
            setLoading(false);
        }
    };

    const getUserRole = async (uid) => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            return userSnap.data().role;
        }
        return null;
    };

    const handleLoginAccount = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, searchInput, passwordInput);
            const user = userCredential.user;

            const userDoc = doc(db, 'users', user.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userRole = await getUserRole(user.uid);
                if (userRole === 'admin') {
                    navigate('/admin');
                } else if (userRole === 'educator') {
                    navigate('/educator');
                } else if (userRole === 'student') {
                    toast.warning("Student accounts are not allowed to access this portal.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                    });
                } else {
                    toast.error("The Email or password is incorrect.", { position: "top-center" });
                }
            } else {
                toast.error('No user data found in Firestore!', {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const goToLoginPage = () => {
        
        if (selectedOption === "option1") {
            toast.success('haha')
        } else if (selectedOption === "option2") {
            handleLoginContinue()
        }
    };

    const forgotPasswordButton = () => {
        setAccountFound(false);
        setSearchInput('');
        setPasswordInput('');
    };

    const notYou = () => {
        navigate('/Loginpage')
    }

    const tryAnotherWay = () => {
        setOption(false);
    };

    const handleLoginContinue = () => {
        setOption(true)
    }

    return (
        <div>
            <div className='z-30 sticky top-0 w-full'>
                <Navbar />
            </div>
            <div className='absolute top-0 w-full z-10'>
                <Carousel images={images} interval={3000} />
            </div>
            <div className='flex w-full justify-center items-center content-center'>
                <div className='z-20 bg-[#000000d3] w-full h-screen flex justify-center items-center'>
                    <div className='flex z-10 absolute top-0 w-full'>
                        <BackgroundBeamsWithCollision />
                    </div>
                    {!accountFound ? (
                        <motion.div
                            className='flex w-[400px] z-50 px-10 pt-16 pb-24 rounded-2xl justify-center items-center text-center bg-gradient-to-tr from-[#68F276] to-[#1DD32F] login'
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <form className='flex-col flex w-full' onSubmit={handleSearchAccount}>
                                <div className='mt-8 text-2xl font-semibold'>Find your account</div>
                                <div className='mt-1 text-sm text-[#000000b9] text-center mb-3'>
                                    Please enter your email to search for your account.
                                </div>
                                <div className='relative mt-5'>
                                    <label
                                        className={`absolute z-10 left-4 transition-all duration-300 ${isInputFocused || searchInput ? 'top-[-20px] text-sm text-gray-600' : 'top-[-15px] text-base text-black'}`}
                                    >
                                        Email:
                                    </label>
                                    <input
                                        className='w-full z-20 rounded pl-2 text-xl drop-shadow-lg border-black border-solid focus:border-transparent focus:outline-none'
                                        type='text'
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onFocus={() => setInputFocused(true)}
                                        onBlur={() => setInputFocused(false)}
                                        required
                                    />
                                </div>
                                <div className='mt-5 gap-3 flex justify-end transition-all'>
                                    <button type='button' onClick={notYou} className='text-xl px-3 py-1 bg-gray-300 rounded-md drop-shadow-md'>Cancel</button>
                                    <button type='submit' className={`text-xl px-3 rounded-md text-white drop-shadow-md py-1 bg-green-700 ${loading ? 'cursor-not-allowed bg-gray-700 text-white' : ''} `}>
                                        {loading ? <LoadingButtons /> : 'Search'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <div className='flex z-50'>
                            {option ? (
                                <motion.div
                                    className='flex w-[400px] z-50 px-10 pt-16 pb-16 rounded-2xl justify-center items-center text-center bg-gradient-to-tr from-[#68F276] to-[#1DD32F] login'
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <form onSubmit={handleLoginAccount} className='w-full'>
                                        <div className='text-xl font-semibold'>Log in as {firstName} {lastName}</div>
                                        <div className='flex justify-center text-[#000000b9] mb-2'>
                                            <div className='mr-2'>{firstName} {lastName}</div>
                                            <div className='text-blue-800 hover:underline'>
                                                <button className='hover:underline transition-all' onClick={forgotPasswordButton}>Not you?</button>
                                            </div>
                                        </div>
                                        <div className='relative mt-5'>
                                            <label
                                                className={`absolute z-10 left-4 transition-all duration-300 ${isInputFocused || passwordInput ? 'top-[-20px] text-sm text-gray-600' : 'top-[-15px] text-base text-black'}`}
                                            >
                                                Password:
                                            </label>
                                            <input
                                                className='w-full z-20 rounded pl-2 text-xl drop-shadow-lg border-black border-solid focus:border-transparent focus:outline-none'
                                                type='password'
                                                value={passwordInput}
                                                onChange={(e) => setPasswordInput(e.target.value)}
                                                onFocus={() => setInputFocused(true)}
                                                onBlur={() => setInputFocused(false)}
                                                required
                                            />
                                        </div>
                                        <div className='mt-5 gap-3 flex justify-end transition-all'>
                                            <button type='button' onClick={tryAnotherWay} className='text-xl px-3 py-1 bg-gray-300 rounded-md drop-shadow-md'>Try another way</button>
                                            <button type='submit' className={`text-xl px-3 rounded-md text-white drop-shadow-md py-1 bg-green-700 ${loading ? 'cursor-not-allowed bg-gray-700 text-white' : ''} `}>
                                                {loading ? <LoadingButtons /> : 'Log in'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className='flex w-[400px] z-50 px-10 pt-16 pb-16 rounded-2xl justify-center items-center text-center bg-gradient-to-tr from-[#68F276] to-[#1DD32F] login'
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <form className='w-full'>
                                        <div className='text-xl font-semibold'>Choose another way to log in</div>
                                        <div className='mt-2 text-[#000000b9] text-sm text-left mb-3'>
                                            Choose an option below:
                                        </div>
                                        <div className='flex'>
                                            <div>
                                                <div className='mb-2'>
                                                    <div className='flex'>
                                                        <label className='text-left flex items-center'>
                                                            <input
                                                                className='w-6 h-4'
                                                                type="radio"
                                                                value="option1"
                                                                checked={selectedOption === 'option1'}
                                                                onChange={handleOptionChange}
                                                            />
                                                            Send code via email
                                                        </label>
                                                    </div>
                                                    <div className='flex justify-start ml-8'>
                                                        <div className='first-letter:uppercase text-[#000000b9]'>{searchInput}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className='flex text-left items-center'>
                                                        <input
                                                            className='w-6 h-4'
                                                            type="radio"
                                                            value="option2"
                                                            checked={selectedOption === 'option2'}
                                                            onChange={handleOptionChange}
                                                        />
                                                        Enter your password to log in
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-5 gap-3 flex justify-end transition-all'>
                                            <button type='button' onClick={handleLoginContinue} className='text-xl px-3 py-1 bg-gray-300 rounded-md drop-shadow-md'>Back</button>
                                            <button type='button' onClick={goToLoginPage} className='text-xl px-3 py-1 bg-green-700 rounded-md text-white drop-shadow-md'>Continue</button>
                                        </div>
                                    </form>
                                </motion.div>

                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
