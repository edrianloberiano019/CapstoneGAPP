import React, { useState, useEffect } from 'react';
import DashboardCarousel from "../Class/DashboardCarousel";
import image1 from "../images/Image1.jpg"
import image2 from "../images/Image2.jpg"
import image3 from "../images/Image3.jpg"
import backgroundImage from "../images/schedBG.jpg"
import backgroundImages from "../images/celebBG.jpg"


function DashboardChild() {



  const images = [image1, image2, image3]


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


  return (
    <div className="flex-1 px-6 pt-1">
      <div>
        <a href="/" className="text-white">

        </a>
      </div>
      <div className=" text-3xl font-bold ">Dashboard</div>
      <DashboardCarousel images={images} />


      <div className="flex mb-6 gap-10">
        <div className='flex w-full'>
          <div className='w-full'>
            <div>Leaderboard </div>
            <button className="bg-gray-200 hover:scale-105 transition-all h-[200px] w-full flex justify-center content-center items-center drop-shadow-lg p-6 rounded-lg text-center" style={appstyle2}>
              <div>
                <h3 className="text-4xl text-black font-bold">HIGHEST POINTS</h3>
                <p className="mt-1 text-black text-3xl ">
                  <strong className='text-yellow-500'>1st:</strong> Villegas
                </p>
                <p className="text-3xl text-black">
                  <strong className='text-slate-300'>2nd:</strong> Gonzales
                </p>
                <p className=" text-3xl  text-black">
                  <strong className='text-[#a04f0d] '>3rd:</strong> Dalida
                </p>

              </div>
            </button>

          </div>
        </div>
        <div className='w-full'>
          <div>Calendar</div>
          <button className=" h-[200px] hover:scale-105 transition-all w-full flex justify-center content-center items-center drop-shadow-lg p-6 rounded-lg text-center" style={appStyle}>
            <div className=''>
            <p className="mt-4 text-black text-left">{currentDay}</p>
            <p className="text-6xl text-black font-bold">{formattedDate}</p>
            <p className="text-black">No Event</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}

export default DashboardChild