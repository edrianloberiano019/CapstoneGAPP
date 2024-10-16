
import React, { useState, useEffect } from "react";
import Navbar from "../Class/navbar";
import StudentRegistration from "../Class/StudentRegistration";
import RegisteredStudents from "../Class/RegisteredStudents";
import EducatorRegistration from "../Class/EducatorRegistration"
import RegisteredEducators from "../Class/RegisteredEducators";
import AdminAnnouncement from "../Class/AdminAnnouncement";
import AdminSidebar from "../Class/AdminSidebar";
import { auth } from '../firebase';
import Calendar from '../Class/Calendar'
import Leaderboard from "../Class/Leaderboard";


const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState('home');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe(); 
  }, []);
 
  return (
    <div>
      <div className="absolute z-10  top-0 w-full">
        <Navbar setSelectedView={setSelectedView} isAuthenticated={isUserLoggedIn} />
      </div>
      <div className='flex z-20 w-full h-screen pt-16'>
        <div>
          <AdminSidebar setSelectedView={setSelectedView} />
        </div>
        <div className='flex bg-[#C0EBA6] w-full h-full p-5'>
          {selectedView === 'home' && <h1 className="text-3xl w-full z-30"><AdminAnnouncement /></h1>}
          {selectedView === 'stureg' && <h1 className="text-3xl w-full overflow-hidden"><StudentRegistration /></h1>}
          {selectedView === 'regstu' && <h1 className="text-3xl w-full overflow-hidden"><RegisteredStudents /></h1>}
          {selectedView === 'edureg' && <h1 className="text-3xl w-full overflow-hidden"><EducatorRegistration /></h1>}
          {selectedView === 'regedu' && <h1 className="text-3xl w-full overflow-hidden"><RegisteredEducators /></h1>}
          {selectedView === 'cal' && <h1 className="text-3xl"><Calendar /></h1>}
          {selectedView === 'leaderboard' && <h1 className="text-3xl w-full overflow-hidden"><Leaderboard /></h1>}
          {selectedView === 'customer' && <h1 className="text-3xl">ha</h1>}
          {selectedView === 'users' && <h1 className="text-3xl">Users Section</h1>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
