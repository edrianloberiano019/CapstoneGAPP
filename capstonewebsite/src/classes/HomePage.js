import React, { useEffect, useState } from 'react';
import Carousel from '../Class/carousel';
import Navbar from '../Class/navbar';
import '../App.css';
import Image1 from '../images/Image1.jpg';
import { useNavigate } from 'react-router-dom';
import Image2 from '../images/Image2.jpg';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '../Class/background-beams-with-collision';
import Announcement from '../Class/Announcement';
import { ContainerScroll } from '../Class/ContainerScroll';
import { FlipWords } from '../Class/flip-words';
import { BackgroundLines } from '../Class/background-lines'
import { Boxes } from '../Class/background-boxes'
import ParticlesComponent from '../Class/ParticlesComponent'
import Footer from '../Class/Footer';


const HomePage = () => {
    const images = [Image1, Image2];
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    const login = () => {
        navigate('/Loginpage');
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const words = ["ellegance", "amazing", "modern", "captivating"];

    return (
        <div>
            <div className={`z-40 fixed top-0 w-full transition-all duration-400 ease-in-out ${isScrolled ? 'bg-green-500' : 'bg-transparent'}`}>
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="w-full h-screen z-20">
                <Carousel images={images} interval={3000} />
            </div>
            <div className='flex z-40'>
                <div className="w-full drop-shadow-md z-30 h-screen absolute top-0 right-0 bg-gradient-to-t "
                    style={{
                        backgroundImage:
                            "linear-gradient(to top, #000, #0000004d 70%, #000)"
                    }}>
                    <div className='absolute z-10 w-full h-screen top-0'>
                        <BackgroundBeamsWithCollision />

                    </div>
                    <div className='mt-[190px] z-20 ml-52 relative'>
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
                            <button onClick={login} className='hover:scale-110 duration-500 transform transition-all hover:shadow-2xl z-30 mt-[215px] drop-shadow-lg bg-gradient-to-tr from-[#FCC429] to-[#E5603D] text-[35px] px-16 py-2 rounded-full'>Login</button>
                        </motion.div>
                    </div>
                </div>

            </div>
            <div className='z-20 w-full '>
                <div className=''>
                    <ParticlesComponent />

                    <Announcement />

                </div>
                <div className='w-full z-30 relative '>

                    <BackgroundLines className='z-30 overflow-hidden '>

                        <div className='absolute top-0 mt-96 w-full text-7xl text-center text-white'>
                            <div className='flex text-center justify-center transition-all'>
                                <div className='transition-all mr-1'>Experience the </div>
                                <FlipWords words={words} />
                            </div>
                            <div>
                                <div>of our stunning application.</div>
                            </div>
                            <div className='text-xl mt-5'>Download our application through this link: </div>
                        </div>

                    </BackgroundLines>

                </div>
            </div>
            <div className='bg-black'>
                <Footer />

            </div>
        </div>
    );
};

export default HomePage;
