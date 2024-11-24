import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";  
import { db } from "../firebase";  
import ScoreGraph from "./ScoreGraph";

function DataAnalysis() {
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [scoreType, setScoreType] = useState("eventHistory"); 
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const studentsQuery = scoreType === "lowest"
          ? query(collection(db, "users"), where("role", "==", "student"))
          : collection(db, "users"); 

        const snapshot = await getDocs(studentsQuery);
        const studentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          firstName: doc.data().firstName || "FirstName",
          lastName: doc.data().lastName || "LastName",
          puzzleScore: parseInt(doc.data().puzzleScore) || 0,
          crosswordScore: parseInt(doc.data().crosswordScore) || 0,
        }));

        if (scoreType === "lowest") {
          const lowestStudents = studentsData
            .sort((a, b) => (a.puzzleScore + a.crosswordScore) - (b.puzzleScore + b.crosswordScore)) 
            .slice(0, 5); 

          setStudents(lowestStudents); 
        } else {
          const topStudents = studentsData
            .sort((a, b) => (b.puzzleScore + b.crosswordScore) - (a.puzzleScore + a.crosswordScore))
            .slice(0, 5);

          setStudents(topStudents);
        }
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    const fetchEventHistory = async () => {
      try {
        const eventsQuery = collection(db, "events");
        const snapshot = await getDocs(eventsQuery);
        const eventsData = snapshot.docs.map(doc => doc.id);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchTopStudents();  
    fetchEventHistory(); 
  }, [scoreType]); 

  return (
    <div>
      <div>
        <label>Choose Display Type:</label>
        <select onChange={(e) => setScoreType(e.target.value)} value={scoreType}>
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
          <option value="eventHistory">Event History</option>
        </select>
      </div>

      <ScoreGraph
        students={students}
        scoreType={scoreType}
        months={months}
        events={events}
      />
    </div>
  );
}

export default DataAnalysis;
