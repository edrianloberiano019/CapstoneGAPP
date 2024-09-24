import React from "react";

const students = [
  { name: "Villegas", progress: 70, scores: 45, totalScores: 45 },
  { name: "Gonzales", progress: 45, scores: 45, totalScores: 45 },
  { name: "Loberiano", progress: 45, scores: 45, totalScores: 45 },
];

const StudentTracker = () => {
  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      students.map((s) => `${s.name},${s.progress},${s.scores},${s.totalScores}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_data.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-gray-300 text-black font-bold rounded"
        >
          Download
        </button>
        <div>
          <span className="font-bold">5/10/2024</span>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2">Student Name</th>
            <th className="py-2 px-4 border-b-2">Student Progress</th>
            <th className="py-2 px-4 border-b-2">Student Scores</th>
            <th className="py-2 px-4 border-b-2">Total Scores</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 mr-2">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"     
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        strokeDasharray={`${student.progress} ${100 - student.progress}`}
                        strokeDashoffset="25"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {student.progress}%
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 mr-2">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        strokeDasharray={`${student.scores} ${100 - student.scores}`}
                        strokeDashoffset="25"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {student.scores}%
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 mr-2">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        strokeDasharray={`${student.totalScores} ${100 - student.totalScores}`}
                        strokeDashoffset="25"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {student.totalScores}%
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTracker;
