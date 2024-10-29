import React, { useState } from 'react';
import { AnimatedTooltip } from "../Class/animated-tooltip";
import JohnImage from '../images/ed2.jpg';
import RobertImage from '../images/dalida.png';
import JaneImage from '../images/gonzales.jpg';
import EmilyImage from '../images/johsua.jpg';
import TylerImage from '../images/ch1.png';
import DoraImage from '../images/ch1.png';

function AdminSidebar({ setSelectedView }) {
    const [openDropdown, setOpenDropdown] = useState("");

    const toggleDropdown = (dropdown) => {
        if (openDropdown === dropdown) {
            setOpenDropdown("");
        } else {
            setOpenDropdown(dropdown);
        }
    };

    const people = [
        {
          id: 1,
          name: "Edrian Loberiano",
          designation: "Software Engineer",
          image: JohnImage,
        },
        {
          id: 2,
          name: "Christian Dalida",
          designation: "i dont know",
          image: RobertImage,
        },
        {
          id: 3,
          name: "Christine Gonzales",
          designation: "i dont know",
          image: JaneImage,
        },
        {
          id: 4,
          name: "Johsua Villegas",
          designation: "i dont know",
          image: EmilyImage,
        }
      ];

    return (
        <div className="flex flex-col justify-between container h-screen bg-[#D5ED9F] drop-shadow-lg">
            <div className="w-64 bg-[#D5ED9F] text-black">
                <div className="pt-6 pl-4 pb-2 text-3xl font-bold">Categories</div>
                <div className="flex justify-between items-end">
                    <div>
                        <button
                            onClick={() => setSelectedView('home')}
                            className="block py-1.5 w-full text-left text-xl px-4 transition duration-200 hover:bg-[#bbd188]"
                        >
                            Dashboard
                        </button>
                        <div>
                            <button
                                onClick={() => toggleDropdown("students")}
                                className="w-full text-xl text-left flex items-center justify-between py-1.5 px-4 transition duration-200 hover:bg-[#bbd188]"
                            >
                                <span>Students</span>
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform duration-300 ease-in-out ${openDropdown === "students" ? 'rotate-90 ' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === "students" ? "max-h-40" : "max-h-0"
                                    }`}
                            >
                                <button onClick={() => setSelectedView('stureg')}
                                    className="block py-1.5 text-left text-xl w-full px-4 pl-8 transition duration-200 hover:bg-[#bbd188]"
                                >
                                    Student Registration
                                </button>
                                <button onClick={() => setSelectedView('regstu')}
                                    href="/"
                                    className="block py-1.5 text-left text-xl w-full px-4 pl-8 transition duration-200 hover:bg-[#bbd188]"
                                >
                                    Registered Students
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleDropdown("educators")}
                                className="w-full text-xl text-left flex items-center justify-between py-1.5 px-4 transition duration-200 hover:bg-[#bbd188]"
                            >
                                <span>Educators</span>
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform duration-300 ease-in-out ${openDropdown === "educators" ? 'rotate-90 ' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === "educators" ? "max-h-40" : "max-h-0"
                                    }`}
                            >
                                <button onClick={() => setSelectedView('edureg')}
                                    className="block py-1.5 text-left w-full text-xl px-4 pl-8 transition duration-200 hover:bg-[#bbd188]"
                                >
                                    Educators Registration
                                </button>
                                <button onClick={() => setSelectedView('regedu')}
                                    className="block text-left py-1.5 w-full text-xl px-4 pl-8 transition duration-200 hover:bg-[#bbd188]"
                                >
                                    Registered Educators
                                </button>
                            </div>
                        </div>

                        <a
                            href="/"
                            className="block py-1.5 text-xl px-4 transition duration-200 hover:bg-[#bbd188]"
                        >
                            Game Settings
                        </a>
                        <button onClick={() => setSelectedView('leaderboard')}
                            className="w-full text-xl text-left flex items-center justify-between py-1.5 px-4 transition duration-200 hover:bg-[#bbd188]"
                        >
                            Leaderboard
                        </button>
                        <button onClick={() => setSelectedView('bg')}
                            className="w-full text-xl text-left flex items-center justify-between py-1.5 px-4 transition duration-200 hover:bg-[#bbd188]"
                        >
                            Calendar
                        </button>
                        <button onClick={() => setSelectedView('users')}
                            className="w-full text-xl text-left flex items-center justify-between py-1.5 px-4 transition duration-200 hover:bg-[#bbd188]"
                        >
                            Calendar
                        </button>

                    </div>
                </div>
            </div>
            <div className='mb-24'>
                <div className="flex ml-9 mb-2 w-full">
                    <AnimatedTooltip items={people} />
                </div>
                <div className='text-center ml-0'>Developers</div>
        
            </div>
        </div>
    );
}

export default AdminSidebar;
