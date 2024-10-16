import React from 'react'
import Navbar from '../Class/navbar'
import AdminSidebar from '../Class/AdminSidebar'

function AdminDashboard() {


  return (
    <div className='w-full h-screen'>
        <div>
          <Navbar />
        
        </div>
        <div className='w-full h-full'>
            <AdminSidebar className="w-full h-full" />    
        </div>

    </div>
  )
}

export default AdminDashboard