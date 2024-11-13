import React, { useState, useEffect } from "react";
import Navbar from "../Class/navbar";
import Sidebar from "../Class/Sidebar";
import DashboardChild from "../Class/DashboardChild";
import StudentRegistration from "../Class/StudentRegistration";
import RegisteredStudents from "../Class/RegisteredStudents";
import EducatorRegistration from "../Class/EducatorRegistration"
import RegisteredEducators from "../Class/RegisteredEducators";
import { auth } from '../firebase';
import Calendar from "../Class/Calendar";
import { AuthProvider } from '../Class/authContext'; 
import Leaderboard from "../Class/Leaderboard";




const Dashboard = () => {
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
      <div className="sticky z-10  top-0 w-full">
        <Navbar setSelectedView={setSelectedView} isAuthenticated={isUserLoggedIn} />
      </div>
      <div className='flex z-20 w-full h-full '>
        <div className="sticky top-0 h-screen w-72 overflow-y-hidden overflow-x-hidden">
          <Sidebar setSelectedView={setSelectedView} />
        </div>
        <div className='flex bg-[#C0EBA6]  w-full h-screen pt-20 p-5 overflow-x-hidden overflow-y-auto'>
          {selectedView === 'home' && <h1 className="text-3xl w-full overflow-hidden"><DashboardChild setSelectedView={setSelectedView} /></h1>}
          {selectedView === 'stureg' && <h1 className="text-3xl w-full overflow-hidden"><StudentRegistration /></h1>}
          {selectedView === 'regstu' && <h1 className="text-3xl w-full overflow-hidden"><RegisteredStudents /></h1>}
          {selectedView === 'edureg' && <h1 className="text-3xl w-full overflow-hidden"><EducatorRegistration /></h1>}
          {selectedView === 'regedu' && <h1 className="text-3xl w-full overflow-hidden"><RegisteredEducators /></h1>}
          {selectedView === 'lead' && <h1 className="text-3xl w-full "><Leaderboard /></h1>}
          {selectedView === 'cals' && <h1 className="text-3xl w-full">
            <AuthProvider>
              <Calendar />
            
            </AuthProvider></h1>}
          {selectedView === 'supplier' && <h1 className="text-3xl">Supplier List</h1>}
          {selectedView === 'customer' && <h1 className="text-3xl">ha</h1>}
          {selectedView === 'users' && <h1 className="text-3xl">Users Section</h1>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
