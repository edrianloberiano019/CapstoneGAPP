import React from 'react'
import Carousel from '../Class/carousel'
import Navbar from '../Class/navbar'
import '../App.css';
import Image1 from '../images/Image1.jpg'
import Image2 from '../images/Image2.jpg'



const HomePage = () => {
    const images = [
        Image1,
        Image2,
      
    ];

    const login = () => {
        window.location.href = "/login";
    };

    return (
        <div>
            <div className='z-10'>
            </div>
            <div className="w-full h-screen">
                <Carousel images={images} interval={3000} />
            </div>
            <div className='flex'>
                <div className='w-full z-20 h-screen absolute top-0 right-0 bg-[#000000d3]'>
                    <Navbar />

                    <div className='mt-[190px] ml-10 relative'>
                        <div className='flex'>
                            <div className='flex text-[75px] text-white'>Welcome to</div>
                            <div className='flex ml-3 text-[75px] text-[#1DD32F] Gods'>Touched by</div>
                        </div>
                        <div className='z-20 relative'>
                            <div className='flex absolute top-[-75px] z-20 m-0 text-[144px] text-[#1DD32F] Gods'>God's Grace</div>
                            <div className='flex absolute top-[40px] z-20 m-0 text-[144px] text-[#1DD32F] Gods'>Ministry A/G</div>
                        </div>
                        <div className='z-50 relative'>
                            <button onClick={login} className='hover:scale-110 duration-500  transform transition-all hover:shadow-2xl  z-30 mt-[215px] drop-shadow-lg bg-gradient-to-tr from-[#FCC429] to-[#E5603D] text-[35px] px-16 py-2 rounded-full'>Login</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage