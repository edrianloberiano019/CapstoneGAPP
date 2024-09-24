import React, { useState } from "react";
import Navbar from "../Class/navbar";

const App = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
 
  return (
    <div>
      <div className="flex bg-green-600">
        <Navbar />
        <a href="Profile"
        className="flex font-Londrina w-full h-[70px] px-10 text-white pt-5 py-3">
          Profile
        </a>
      </div>
      <div className="flex h-screen bg-gray-100">
        {/* dashboard */}
        <div className="w-64 bg-gray-300 text-black">
          <div className="p-6 text-2xl font-bold">
            Touched by God's Grace Ministry A/G
          </div>
          <nav className="mt-10">
            <a
              href="#dashboard"
              className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500"
            >
              Dashboard
            </a>
            {/*Student Registration*/}
            <div>
              <button
                onClick={() => toggleDropdown("students")}
                className="w-full text-left hover:text-white flex items-center justify-between py-2.5 px-4 transition duration-200 hover:bg-gray-500"
              >
                <span>Students</span>
                <span>{openDropdown === "students" ? "▲" : "▼"}</span>
              </button>
              {openDropdown === "students" && (
                <div className="bg-gray text-black pl-4">
                  <a
                    href="#registration"
                    className="block py-2.5 px-4 rounded hover:text-white transition duration-200 hover:bg-gray-500"
                  >
                    Students Registration
                  </a>
                  <a
                    href="#registered"
                    className="block py-2.5 px-4 rounded hover:text-white transition duration-200 hover:bg-gray-500"
                  >
                    Registered Students
                  </a>
                  <a 
                  href="/student-tracker" className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500">
                    Student Tracker
                  </a>
                </div>
              )}
            </div>
            {/*Educators Registration*/}
            <div>
              <button
                onClick={() => toggleDropdown("educators")}
                className="w-full text-left hover:text-white flex items-center justify-between py-2.5 px-4 transition duration-200 hover:bg-gray-500"
              >
                <span>Educators</span>
                <span>{openDropdown ? "▲" : "▼"}</span>
              </button>
              {openDropdown === "educators" && (
                <div className="bg-gray text-black pl-4">
                  <a
                    href="#educators-registration"
                    className="block py-2.5 px-4 rounded hover:text-white transition duration-200 hover:bg-gray-500"
                  >
                    Educators Registration
                  </a>
                  <a
                    href="#registered-educators"
                    className="block py-2.5 px-4 rounded hover:text-white transition duration-200 hover:bg-gray-500"
                  >
                    Registered Educators
                  </a>
                </div>
              )}
            </div>

            <a
              href="#game-settings"
              className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500"
            >
              Game Settings
            </a>
            {/*Leaderboards*/}
            <a
              href="#leaderboards"
              className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500"
            >
              Leaderboards
            </a>
            <a
              href="#calendar"
              className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500"
            >
              Calendar
            </a>
            <a
              href="#journal-settings"
              className="block py-2.5 px-4 hover:text-white transition duration-200 hover:bg-gray-500"
            >
              Journal Settings
            </a>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div>
            <a href="#" className="text-white">
            
            </a>
          </div>
          <div className="text-center text-4xl font-bold mb-6">Dashboard</div>
          <div className="bg-red-600 text-white p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold">Sunday Celebration Worship</h2>
          </div>
          <div className="flex justify-between mb-6">
            <div className="bg-gray-200 p-6 rounded-lg w-1/3 text-center">
              <h3 className="text-xl font-bold">Leaderboard</h3>
              <p className="mt-4">
                <strong>1st:</strong> Villegas
              </p>
              <p>
                <strong>2nd:</strong> Gonzales
              </p>
              <p>
                <strong>3rd:</strong> Dalida
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg w-1/3 text-center">
              <h3 className="text-xl font-bold">Calendar</h3>
              <p className="mt-4">Saturday</p>
              <p className="text-2xl font-bold">April 27, 2024</p>
              <p>No Schedule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
