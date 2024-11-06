import React, { useState, useEffect } from 'react';
import DashboardCarousel from "../Class/DashboardCarousel";
import image1 from "../images/Image1.jpg";
import image2 from "../images/Image2.jpg";
import image3 from "../images/Image3.jpg";
import backgroundImage from "../images/schedBG.jpg";
import backgroundImages from "../images/celebBG.jpg";
import { motion } from 'framer-motion';
import Loading from '../Class/Loading'
import { format } from 'date-fns';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const today = new Date();
const currentDays = format(today, 'EEEE');
const formattedDates = format(today, 'yyyy-MM-dd');

function DashboardChild({ setSelectedView }) {
    const [loading, setLoading] = useState(true);
    const [eventText, setEventText] = useState('No Event');
    const images = [image1, image2, image3];

    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
    };

    const appstyle2 = {
        backgroundImage: `url(${backgroundImages})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' });

    useEffect(() => {
        const loadImages = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });

        loadImages.then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            const docRef = doc(db, 'events', formattedDates);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setEventText(docSnap.data().eventText);
            }
        };

        fetchEvent();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex-1 px-6 h-screen">
            <div className="text-4xl text-center uppercase">Announcements</div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <DashboardCarousel images={images} />
            </motion.div>

            <div className="flex mb-6 gap-10">
                <div className="flex w-full">
                    <div className="w-full">
                        <div className='text-center pb-1 pt-3 uppercase '>Leaderboard</div>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <button className="bg-gray-200 hover:scale-105 transition-all h-[200px] w-full flex justify-center content-center items-center drop-shadow-lg p-6 rounded-lg text-center" style={appstyle2}>
                                <div>
                                    <h3 className="text-4xl text-black font-bold">HIGHEST POINTS</h3>
                                    <p className="mt-1 text-black text-3xl">
                                        <strong className="text-yellow-500">1st:</strong> Villegas
                                    </p>
                                    <p className="text-3xl text-black">
                                        <strong className="text-slate-300">2nd:</strong> Gonzales
                                    </p>
                                    <p className="text-3xl text-black">
                                        <strong className="text-[#a04f0d]">3rd:</strong> Dalida
                                    </p>
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full">
                    <div className='text-center uppercase pt-3 pb-1 w-full'>Calendar</div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <button onClick={() => setSelectedView('cals')} className="h-[200px] overflow-hidden hover:scale-105 transition-all w-full flex justify-center items-center drop-shadow-lg p-6 rounded-lg text-center" style={appStyle}>
                            <div >
                                <div className='w-full'>
                                    <p className="mt-4 text-black text-center">{currentDays}</p>
                                    <p className="text-6xl text-black font-bold">{formattedDate}</p>
                                
                                </div>
                                <p className="text-black">{eventText}</p>
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default DashboardChild;
