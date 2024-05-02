import React from 'react'
import '../App.css'
import Logo from '../images/LOGO2.png'


function Navbar() {
  return (
    <a href='/' className='flex font-Londrina w-full h-[70px] px-10 text-white pt-5 py-3 justify-between'>
        <div className='flex justify-center items-center'>
          <img className='flex w-[50px] mr-3' src={Logo} alt='Logo2'/>
          <div className='flex text-4xl uppercase' style={{ 
            backgroundImage: 'linear-gradient(to top left, #fccf46, #fccf46, #ee5343)', 
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Touched by God's grace ministry a/g</div>
        </div>
        <div className='text-2xl uppercase'>
          <a className='pr-10' href='/login'>ABOUT</a>
          <a className='' href='/login'>FAQs</a>

        </div>
    </a>
  )
}

export default Navbar