// AdminAnnouncement.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';  // Import Firestore instance
import { collection, getDocs, query, where, limit } from 'firebase/firestore';  // Modular imports for Firestore
import UploadImage from '../Class/UploadImage';
import ScoreGraph from '../Class/ScoreGraph';

function AdminAnnouncement() {
  const [students, setStudents] = useState([]);
  const goal = 1000;

  

  return (
    <div>
      <div className="text-4xl uppercase text-center">Announcement Images</div>
      <UploadImage />
      <div className="flex justify-center items-center w-full ">
        <div className='flex w-full'>
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncement;
