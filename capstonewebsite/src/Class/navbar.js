import React from 'react'
import '../App.css'


function Navbar(setSelectedView) {
  return (
    <div className='flex font-Londrina bg-[#00712D] drop-shadow-lg w-full h-[70px] px-10 text-white pt-5 py-5 justify-between'>
        <button onClick={() => setSelectedView=('home')} className='flex justify-center items-center'>
          <div className='flex text-4xl uppercase' style={{ 
            backgroundImage: 'linear-gradient(to top left, #fccf46, #fccf46, #ee5343)', 
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Touched by God's grace ministry a/g</div>
        </button>
        <div className='text-2xl uppercase'>
          <a className='pr-10' href='/login'>ABOUT</a>
          <a className='' href='/login'>FAQs</a>

        </div>
    </div>
  )
}

export default Navbar