import React from 'react'
import Carousel from '../components/carousel'
import Navbar from '../components/navbar'
import '../App.css';
import Image1 from '../images/Image1.jpg'
import Image2 from '../images/Image2.jpg'
import Image3 from '../images/Image3.jpg'


const LoginPage = () => {
    const images = [
        Image1,
        Image2,
        Image3
    ];

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
                    <div className='flex justify-center items-center mt-48 '>
                        <div className='flex w-[400px] px-10 pt-16 pb-24 rounded-2xl justify-center items-center text-center bg-gradient-to-tr from-[#68F276] to-[#1DD32F] login'>
                            <div className='w-full'>
                                <div className='text-7xl lvl ' style={{ 
                                    backgroundImage: 'linear-gradient(to right, #fccf46, #ee5343)', 
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}>LEVEL 2</div>
                                <div className='mt-8 text-2xl font-semibold'>Login</div>
                                <div className='px-7 mt-5'>
                                    <div className='absolute ml-5 z-20 top-[470px]'>Username or Email:</div>
                                    <input className='w-full z-10 rounded pl-2 text-xl drop-shadow-lg border-black border-solid focus:border-transparent focus:outline-none' type='email'/>
                                </div>

                                <div className='flex px-7 mt-5'>
                                    <div className='absolute ml-5 z-20 top-[517px]'>Password:</div>
                                    <input className='w-full z-10 pl-2 text-xl drop-shadow-lg rounded-l focus:border-transparent focus:outline-none' type='password'/>
                                    <div className='bg-white z-20 justify-center items-center border-l-[1px] border-[#d4d4d4] border-solid text-center rounded-r'>
                                        <button className='flex px-2 h-full justify-center items-center'> show </button>
                                    </div>

                                </div>
                                <div className='flex justify-end mr-7'>
                                    <a href='/'>Forgot Password?</a>
                                </div>
                                <div className='z-50 relative'>
                                    <button onClick={''} className='z-30 hover:scale-110 transform transition-all duration-200 tracking-widest mt-2 drop-shadow-lg bg-gradient-to-tr from-[#FCC429] to-[#E5603D] text-[25pxp] font-bold px-12 py-3 rounded-2xl'>Login</button>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};


export default LoginPage