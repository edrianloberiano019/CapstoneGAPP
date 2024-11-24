import React from "react";
import { Bar } from "react-chartjs-2";

const ScoreGraph = ({
  students,
  scoreType,
  months,
  events,
}) => {
  const goal = 1000;

  const getEventCountByMonth = (month) => {
    const monthIndex = months.indexOf(month);
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event); 
      return eventDate.getMonth() === monthIndex;
    });
    return filteredEvents.length;
  };

  let data;
  if (scoreType === "eventHistory") {
    const eventCounts = months.map((month) => getEventCountByMonth(month));
    data = {
      labels: months,
      datasets: [
        {
          label: "Events Per Month",
          data: eventCounts,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  } else if (scoreType === "lowest") {
    console.log("Students before sorting (lowest):", students);
    const sortedStudents = students
      .map(student => ({
        ...student,
        combinedScore: student.puzzleScore + student.crosswordScore  
      }))
      .sort((a, b) => a.combinedScore - b.combinedScore) 
      .slice(0, 5);  

    console.log("Sorted Students by Combined Lowest Scores:", sortedStudents);

    data = {
      labels: sortedStudents.map(student => `${student.firstName} ${student.lastName}`),
      datasets: [
        {
          label: "Puzzle Score",
          data: students.map(student => student.puzzleScore),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Crossword Score",
          data: students.map(student => student.crosswordScore), 
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  } else {
    data = {
      labels: students.map(student => `${student.firstName} ${student.lastName}`),
      datasets: [
        {
          label: "Puzzle Score",
          data: students.map(student => student.puzzleScore), 
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Crossword Score",
          data: students.map(student => student.crosswordScore), 
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: scoreType !== "eventHistory" ? goal : undefined,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          scoreType === "eventHistory"
            ? `Events Count Per Month`
            : scoreType === "lowest"
              ? `Top 5 Students with the Lowest Combined Scores`
              : `Top 5 Students' Scores`,
      },
    },
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScoreGraph;


