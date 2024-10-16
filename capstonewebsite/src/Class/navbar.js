import React from 'react';
import { auth } from '../firebase'; // Import Firebase authentication
import { signOut } from 'firebase/auth'; // Import signOut function
import '../App.css';

function Navbar({ setSelectedView, isAuthenticated }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/Loginpage';
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <div className='flex font-Londrina bg-[#00712D] drop-shadow-lg w-full h-[70px] px-10 text-white pt-5 py-5 justify-between'>
      <button onClick={() => setSelectedView('home')} className='flex justify-center items-center'>
        <div className='flex text-4xl uppercase'>Touched by God's grace ministry a/g</div>
      </button>
      <div className='text-2xl uppercase'>
        <a className='mx-5' href='/login'>ABOUT</a>
        <a className='mx-5' href='/login'>FAQs</a>
        {isAuthenticated && (
          <button className='mx-5' onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
