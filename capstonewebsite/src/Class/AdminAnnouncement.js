import React from 'react'
import UploadImage from './UploadImage'
import {PinContainer } from '../Class/3d-pin'

function AdminAnnouncement() {
  return (
    <div>
        <div className='text-4xl uppercase text-center'>Announcement images</div>
        <UploadImage/>
    </div>
  )
}

export default AdminAnnouncement