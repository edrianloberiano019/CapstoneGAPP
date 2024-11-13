import React from 'react'
import AnnouncementImage from '../images/Announcement1.jpg'
import AnnouncementImage2 from '../images/an2.jpg'
import AnnouncementImage3 from '../images/an3.jpg'

import ParticlesComponent from '../Class/ParticlesComponent'
import { delay, motion, useScroll } from "framer-motion"

function Announcement() {
  const appStyle = {
    backgroundImage: `url(${AnnouncementImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className=' flex w-full   justify-center bg-fixed content-center items-center' style={appStyle}>
      <div className='flex overflow-hidden justify-center content-center items-center px-60 py-[100px] bg-green-700'>
        <div className=''>
        <motion.div
          transition={{ duration: 1 }}
          whileInView={{
              x: 0
          }}
          initial={{  x: -100 }}
          viewport={{ once: true }}>
          <div className='flex justify-center  content-center transition-all ease-out items-center pr-5 rounded-2xl'>
            <div className='h-full drop-shadow-lg w-[500px]   hover:scale-105 transition-all ease-out'>
              <img className=' rounded-2xl' src={AnnouncementImage} />
            
            </div>
            <div className='w-full ml-20'>
              <div className='text-4xl text-white text-center mb-3'>Rev. Roy C. Ledesma</div>
              <div className='text-2xl text-white pr-5 text-center'>We're blessed to welcome Rev. Roy C. Ledesma as our guest speaker, sharing a powerful message from the Lord. Let’s come with open hearts and expect the unexpected as God reveals His truth to us.
                🌟 Don’t miss this special time to gather, praise, and fulfill the Divine Mandate of the Great Commission. Invite your family and friends—let’s make this day unforgettable. See you there! 🙌
              </div>
            </div>

          </div>
        </motion.div>

        <motion.div
          transition={{ duration: 1, delay: 0.5}}
          whileInView={{
              x: 0
          }}
          initial={{ x: 100 }}
          viewport={{ once: true }} className="mt-20">
          <div className='flex justify-center  content-center transition-all ease-out items-center pr-5 rounded-2xl'>
            
            <div className='w-full mr-20'>
              <div className='text-4xl text-white text-center mb-3'>Rev. Romeo I. Gonzales              </div>
              <div className='text-2xl text-white pr-5 text-center'>"Ang taong puno ng pananampalataya sa Diyos ay laging naghahangad ng makapaglingkod ng tapat sa Kanya"
              </div>
            </div>
            <div className='h-full   hover:scale-105 transition-all ease-out rounded-2xl drop-shadow-lg w-[700px] mr-10 overflow-hidden '>
              <img className='w-full' src={AnnouncementImage2} />
            
            </div>
          </div>
        </motion.div>
        

        <motion.div
          transition={{ duration: 1, delay: 0.5}}
          whileInView={{
              x: 0
          }}
          initial={{ x: -100 }}
          viewport={{ once: true }} className="mt-20">
          <div className='flex justify-center  content-center transition-all ease-out items-center pr-5 rounded-2xl'>
            
            <div className='h-full  hover:scale-105 transition-all ease-out rounded-2xl drop-shadow-lg w-[700px] mr-10 overflow-hidden '>
              <img className='w-full' src={AnnouncementImage3} />
            </div>
            <div className='w-full mr-20'>
              <div className='text-4xl text-white text-center mb-3'>Rev. Romeo I. Gonzales</div>
              <div className='text-2xl text-white pr-5 text-center'>You are called to serve,
              A True Servant of God's Kingdom Serves Faithfully without selfishness but denying themselves 
              And Honoring God above all else
              </div>
            </div>
          </div>
        </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Announcement