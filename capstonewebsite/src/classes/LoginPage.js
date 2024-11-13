import React, { useState } from 'react';
import Carousel from '../Class/carousel';
import Navbar from '../Class/navbar';
import '../App.css';
import Image1 from '../images/Image1.jpg';
import Image2 from '../images/Image2.jpg';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from "react-toastify";
import Particles from '../Class/ParticlesComponent';
import { motion } from 'framer-motion'
import { BackgroundBeamsWithCollision } from '../Class/background-beams-with-collision';
import LoadingButtons from '../Class/LoadingButtons'

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const navigate = useNavigate();
    const images = [Image1, Image2];

    const getUserRole = async (uid) => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            return userSnap.data().role;
        }
        return null;
    };

    const toForgotPassword = () => {
        navigate('/forgotP');
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
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
        } catch (error) {
            toast.error("Email or password is incorrect.", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='z-10'></div>
            <div className=" w-full h-screen">
                <Carousel images={images} interval={3000} />
            </div>
            <div className='flex'>
                <div className='w-full overflow-hidden z-20 h-screen absolute top-0 right-0 bg-[#000000d3]'>
                    <div className='flex z-10 absolute top-0 w-full '>
                        <BackgroundBeamsWithCollision />

                    </div>
                    <div className='z-30 sticky top-0 w-full'>
                        <Navbar />
                    
                    </div>
                    <motion.div className=' flex justify-center items-center mt-48'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='flex w-[400px] z-50 px-10 pt-16 pb-24 rounded-2xl justify-center items-center text-center bg-gradient-to-tr from-[#68F276] to-[#1DD32F] login'
                        
                        >
                            <form onSubmit={handleLogin} className='w-full'>
                                <div className='text-7xl stroke-black stroke-2 mt-10 lvl text-white drop-shadow-md'>LEVEL 2</div>
                                <div className='relative mt-8'>
                                    <input
                                        className='w-full z-20 rounded pl-2 text-xl drop-shadow-lg border-black border-solid focus:border-transparent focus:outline-none'
                                        type='email'
                                        value={email}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder='Email or username'
                                    />
                                </div>
                                <div className='flex mt-4'>
                                    <div className='relative  w-full'>
                                        <input
                                            className='w-full z-20 pl-2 text-xl drop-shadow-lg rounded-l focus:border-transparent focus:outline-none'
                                            type='password'
                                            value={password}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder='Password'
                                        />

                                    </div>
                                    <div className='bg-white z-20 justify-center h-full items-center border-l-[1px] border-[#d4d4d4] border-solid text-center rounded-r'>
                                        <button className='flex text-xl px-2 h-full justify-center items-center'>show</button>
                                    </div>
                                </div>

                                <div className='flex justify-end mt-1 mr-1'>
                                    <button onClick={toForgotPassword} className='hover:scale-105 transition-all hover:underline'>Forgot Password?</button>
                                </div>
                                <div className='z-50 relative mt-4'>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className={`z-30 hover:scale-110 transform transition-all duration-200 tracking-widest mt-2 drop-shadow-lg bg-gradient-to-tr from-[#FCC429] to-[#E5603D] text-[25px] font-bold px-12 py-3 rounded-2xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? <LoadingButtons /> : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
