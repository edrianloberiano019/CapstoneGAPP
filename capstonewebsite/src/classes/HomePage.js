import React from 'react'
import Carousel from '../Class/carousel'
import Navbar from '../Class/navbar'
import '../App.css';
import Image1 from '../images/Image1.jpg'
import { useNavigate } from 'react-router-dom';
import Image2 from '../images/Image2.jpg'
import { motion } from 'framer-motion'
import ParticlesComponent from '../Class/ParticlesComponent';
import { BackgroundBeams } from '../Class/background-beams';
import Announcement from '../Class/Announcement';




const HomePage = () => {
    const images = [
        Image1,
        Image2,

    ];

    const navigate = useNavigate();


    const login = () => {
        navigate('/Loginpage')
    };

    


    return (
        <div>
            <div className='z-40 w-full absolute top-0 flex'>
                <Navbar />

            </div>
            <div className="w-full h-screen">
                <Carousel images={images} interval={3000} />

            </div>
            <div className='flex'>
                <div className='w-full z-30 h-screen absolute top-0 right-0 bg-[#000000d3]'>
                    <BackgroundBeams />


                    <div className='mt-[190px] z-20 ml-10 relative'>
                        <div className='flex'>
                            <div className='flex text-[75px] text-white'>Welcome to</div>
                            <div className='flex ml-3 text-[75px] text-[#1DD32F] Gods'>Touched by</div>
                        </div>
                        <div className='z-20 relative'>
                            <div className='flex absolute top-[-75px] m-0 text-[144px] text-[#1DD32F] Gods'>God's Grace</div>
                            <div className='flex absolute top-[40px] m-0 text-[144px] text-[#1DD32F] Gods'>Ministry A/G</div>
                        </div>
                        <motion.div className='z-50 flex'
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <button onClick={login} className='hover:scale-110 duration-500  transform transition-all hover:shadow-2xl  z-30 mt-[215px] drop-shadow-lg bg-gradient-to-tr from-[#FCC429] to-[#E5603D] text-[35px] px-16 py-2 rounded-full'>Login</button>
                        </motion.div>
                    </div>
                </div>
                <div>
                </div>
                <div className='z-20 w-full'>
                    <Announcement />
                </div>

            </div>
        </div>
    );
};

export default HomePage