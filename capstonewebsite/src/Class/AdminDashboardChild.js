import React from 'react'
import Navbar from '../Class/navbar'
import AdminSidebar from '../Class/AdminSidebar'

function AdminDashboard() {


  return (
    <div className='w-full h-full'>
        <div>
          <Navbar />
        
        </div>
        <div className='w-full '>
            <AdminSidebar className="w-full " />    
        </div>

    </div>
  )
}

export default AdminDashboard