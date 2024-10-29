import React from 'react'
import AnnouncementImage from '../images/Announcement1.jpg'
import { motion, useScroll } from "framer-motion"

function Announcement() {
  const appStyle = {
    backgroundImage: `url(${AnnouncementImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className=' flex w-full bg-green-500   justify-center bg-fixed content-center items-center' style={appStyle}>
      <div className='flex justify-center content-center items-center px-80 py-[100px] bg-[#000000c2]'>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileInView="visible"
          viewport={{ once: true }}>
          <div className='flex justify-center items-center'>
            <img className='h-[500px] rounded-2xl drop-shadow-lg w-[500px] mr-10 hover:scale-105 transition-all ease-out' src={AnnouncementImage} />
            <div className='text-2xl text-white '>We're blessed to welcome Rev. Roy C. Ledesma as our guest speaker, sharing a powerful message from the Lord. Let’s come with open hearts and expect the unexpected as God reveals His truth to us.
              🌟 Don’t miss this special time to gather, praise, and fulfill the Divine Mandate of the Great Commission. Invite your family and friends—let’s make this day unforgettable. See you there! 🙌
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Announcement