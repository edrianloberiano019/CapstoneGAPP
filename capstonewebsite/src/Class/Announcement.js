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
          transition={{ duration: 1 }}
          whileInView={{
              x: 0
          }}
          initial={{
              x: "100vh"
          }}
          viewport={{ once: false }}>
          <div className='flex justify-center  content-center hover:scale-105 transition-all ease-out items-center pr-5 rounded-2xl bg-[#37c71ac4]'>
            <div className='h-full rounded-l-2xl drop-shadow-lg w-full mr-10 overflow-hidden '>
              <img className='' src={AnnouncementImage} />
            
            </div>
            <div className='w-full'>
              <div className='text-4xl text-white text-center mb-3'>Rev. Roy C. Ledesma</div>
              <div className='text-2xl text-white pr-5'>We're blessed to welcome Rev. Roy C. Ledesma as our guest speaker, sharing a powerful message from the Lord. Let’s come with open hearts and expect the unexpected as God reveals His truth to us.
                🌟 Don’t miss this special time to gather, praise, and fulfill the Divine Mandate of the Great Commission. Invite your family and friends—let’s make this day unforgettable. See you there! 🙌
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Announcement