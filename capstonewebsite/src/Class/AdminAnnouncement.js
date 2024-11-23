import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { db } from '../firebase';  // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Modular imports for Firestore
import UploadImage from '../Class/UploadImage'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminAnnouncement() {
  const [studentCount, setStudentCount] = useState(0);
  const [educatorCount, setEducatorCount] = useState(0);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      let students = 0;
      let educators = 0;

      usersSnapshot.forEach(doc => {
        const role = doc.data().role;
        if (role === 'student') {
          students++;
        } else if (role === 'educator') {
          educators++;
        }
      });

      setStudentCount(students);
      setEducatorCount(educators);
    };

    fetchUserRoles();
  }, []);

  const data = {
    labels: ['Students', 'Educators'],
    datasets: [
      {
        data: [studentCount, educatorCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <div className="text-4xl uppercase text-center">Announcement Images</div>
      <UploadImage />
      <div className='flex justify-center items-center'>
        <div>
          <div className="text-4xl mt-4 uppercase text-center">Users Analytics</div>
          <Pie className='' data={data} />


        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncement;
