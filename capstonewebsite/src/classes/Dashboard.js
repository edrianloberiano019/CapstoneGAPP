import React, { useState } from "react";
import Navbar from "../Class/navbar";
import Sidebar from "../Class/Sidebar";
import DashboardChild from "../Class/DashboardChild";
import StudentRegistration from "../Class/StudentRegistration";
import RegisteredStudents from "../Class/RegisteredStudents";
import EducatorRegistration from "../Class/EducatorRegistration"
import RegisteredEducators from "../Class/RegisteredEducators";


const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('home');
 
  return (
    <div>
      <div className="absolute z-10  top-0 w-full">
        <Navbar />
      </div>
      <div className='flex z-20 w-full h-screen pt-16'>
        <div>
          <Sidebar setSelectedView={setSelectedView} />
        </div>
        <div className='flex bg-[#C0EBA6] w-full h-full p-5'>
          {selectedView === 'home' && <h1 className="text-3xl w-full"><DashboardChild /></h1>}
          {selectedView === 'stureg' && <h1 className="text-3xl w-full"><StudentRegistration /></h1>}
          {selectedView === 'regstu' && <h1 className="text-3xl w-full"><RegisteredStudents /></h1>}
          {selectedView === 'edureg' && <h1 className="text-3xl w-full"><EducatorRegistration /></h1>}
          {selectedView === 'regedu' && <h1 className="text-3xl w-full"><RegisteredEducators /></h1>}
          {selectedView === 'supplier' && <h1 className="text-3xl">Supplier List</h1>}
          {selectedView === 'customer' && <h1 className="text-3xl">ha</h1>}
          {selectedView === 'users' && <h1 className="text-3xl">Users Section</h1>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
