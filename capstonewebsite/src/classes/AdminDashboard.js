import React, { useState, useEffect } from "react";
import Navbar from "../Class/navbar";
import StudentRegistration from "../Class/StudentRegistration";
import RegisteredStudents from "../Class/RegisteredStudents";
import EducatorRegistration from "../Class/EducatorRegistration";
import RegisteredEducators from "../Class/RegisteredEducators";
import AdminAnnouncement from "../Class/AdminAnnouncement";
import AdminSidebar from "../Class/AdminSidebar";
import { auth } from '../firebase';
import Calendar from '../Class/Calendar';
import Leaderboard from "../Class/Leaderboard";
import { ModalBody } from "../Class/ModalBody";
import { AuthProvider } from "../Class/authContext";
import StudentProgres from "../Class/StudentProgres";
import backgroundImage from "../images/bgforweb.png"

const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState('home');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
  
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',


};

  return (
        <div>
          <div className="z-40 sticky top-0 w-full">
            <Navbar setSelectedView={setSelectedView} isAuthenticated={isUserLoggedIn} />
          </div>
          <div className='flex z-10 w-full h-screen'>
            <div className="sticky top-0 h-screen w-72 overflow-y-hidden drop-shadow-xl overflow-x-hidden">
              <AdminSidebar setSelectedView={setSelectedView} />
            </div>
            <div className='flex pt-20 w-full h-screen p-5 overflow-x-hidden overflow-y-auto' style={appStyle}>
              {selectedView === 'home' && <h1 className="text-3xl w-full h-full"><AdminAnnouncement /></h1>}
              {selectedView === 'stureg' && <h1 className="text-3xl w-full h-full overflow-hidden"><StudentRegistration /></h1>}
              {selectedView === 'regstu' && <h1 className="text-3xl w-full "><RegisteredStudents /></h1>}
              {selectedView === 'edureg' && <h1 className="text-3xl w-full overflow-hidden"><EducatorRegistration /></h1>}
              {selectedView === 'regedu' && <h1 className="text-3xl w-full "><RegisteredEducators /></h1>}
              {selectedView === 'cal' && <h1 className="text-3xl w-full">
                <AuthProvider>
                  <Calendar />
                </AuthProvider>
              </h1>}
              {selectedView === 'leaderboard' && <h1 className="text-3xl w-full"><Leaderboard /></h1>}
              {selectedView === 'bg' && <h1 className="text-3xl w-full overflow-hidden"></h1>}
              {selectedView === 'users' && <h1 className="text-3xl"><ModalBody /></h1>}
              {selectedView === 'sp' && <h1 className="text-3xl w-full"><StudentProgres /></h1>}
            </div>
          </div>
        </div>
  );
};

export default AdminDashboard;
