import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import '../App.css';

function Navbar({ setSelectedView, isAuthenticated, isScrolled }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/Loginpage';
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <div>
      {
        isAuthenticated ? (
          <div className='flex  font-Londrina bg-[#00712D] absolute top-0 drop-shadow-lg w-full h-[70px] px-10 text-white pt-5 py-5 justify-between'>
            <a href='/Homepage' className='flex justify-center items-center'>
              <div className='flex text-4xl uppercase'>GAPP</div>
            </a>
            <div className='text-2xl uppercase'>
              <a className='mx-5' href='/'>ABOUT</a>
              <a className='mx-5' href='/login'>FAQs</a>
              {isAuthenticated && (
                <button className='mx-5' onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>

        ) : (
          <div className={`flex font-Londrina content-center items-center fixed top-0 drop-shadow-lg w-full duration-700 px-10 text-white justify-between transition-all ${isScrolled ? 'bg-green-700 h-[70px] text-black bg-opacity-60 backdrop-blur-lg' : 'h-[50px] bg-transparent'}`} >
            <a href='/Homepage' className='flex justify-center items-center'>
              <div className='flex text-4xl uppercase'>GAPP</div>
            </a>
            <div className='text-2xl uppercase'>
              <a className='mx-5' href='/'>ABOUT</a>
              <a className='mx-5' href='/login'>FAQs</a>
            </div>
          </div>

        )
      }

    </div>

  );
}

export default Navbar;
