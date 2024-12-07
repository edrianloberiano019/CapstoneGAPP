import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import backgroundImage from '../images/bg.jpg';
import Loading from './Loading';
import { motion } from 'framer-motion';

function RegisteredStudents() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const studentsList = [];
            querySnapshot.forEach((doc) => {
                const studentData = doc.data();
                if (studentData.role === 'student') {
                    studentsList.push({ id: doc.id, ...studentData });
                }
            });
            setStudents(studentsList);
            setFilteredStudents(studentsList);
            setLoading(false);
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        const filtered = students.filter((student) =>
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudents(filtered);
    }, [searchQuery, students]);

    const handleDelete = async () => {
        if (selectedStudent) {
            await deleteDoc(doc(db, 'users', selectedStudent.id));
            setStudents(students.filter((student) => student.id !== selectedStudent.id));
            setFilteredStudents(filteredStudents.filter((student) => student.id !== selectedStudent.id));
            setIsConfirmDelete(false);
            setSelectedStudent(null);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <motion.div
            className="w-full drop-shadow-lg pb-5 overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="rounded-lg overflow-hidden" style={appStyle}>
                <div className="p-6 flex w-full bg-[#00712d9c] drop-shadow-md">
                    <div className="flex w-full">
                        <div className="bg-[#ffffffe8] pb-5 py-5 px-10 rounded-lg w-full overflow-auto">
                            <div className="flex justify-between">
                                <div className="flex justify-center content-center items-center">
                                    <div className="text-4xl">Registered Students</div>
                                </div>
                                <div>
                                    <input
                                        className="bg-gray-300 text-2xl focus:outline-none rounded-l-lg px-4 py-1"
                                        placeholder="Search name"
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="justify-center content-center align-middle bg-gray-300 h-full px-4 rounded-r-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-7"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="border-t-2 border-b-2 py-1 gap-5 border-solid flex justify-between border-gray-400 uppercase mt-6">
                                <div className="text-2xl w-[20%]">Name</div>
                                <div className="text-2xl w-[10%]">Gender</div>
                                <div className="text-2xl w-[25%]">Address</div>
                                <div className="text-2xl w-[25%]">Phone no.</div>
                                <div className="text-2xl w-[20%]">Guardian's Name</div>
                                <div className="text-2xl w-[20%]">Guardian's Phone</div>
                                <div className="text-2xl w-[15%]">Password</div>
                                <div className="text-2xl w-[5%]"></div>
                            </div>

                            <div>
                                <ul>
                                    {filteredStudents.map((student, index) => (
                                        <li key={index} className="flex gap-5 justify-between py-2">
                                            <div className="w-[20%] text-2xl overflow-hidden text-ellipsis">
                                                {student.firstName} {student.lastName}
                                            </div>
                                            <div className="w-[10%] first-letter:uppercase text-2xl overflow-hidden text-ellipsis">
                                                {student.gender || 'N/A'}
                                            </div>
                                            <div className="w-[25%] text-2xl overflow-hidden text-ellipsis">
                                                {student.address || 'N/A'}
                                            </div>
                                            <div className="w-[25%] text-2xl overflow-hidden text-ellipsis">
                                                {student.phone || 'N/A'}
                                            </div>
                                            <div className="w-[20%] text-2xl overflow-hidden text-ellipsis">
                                                {student.emergencyContact?.guardianFirstName || 'N/A'}{' '}
                                                {student.emergencyContact?.guardianLastName || ''}
                                            </div>
                                            <div className="w-[20%] text-2xl overflow-hidden text-ellipsis">
                                                {student.emergencyContact?.guardianPhone || 'N/A'}
                                            </div>
                                            <div className="w-[15%] text-2xl overflow-hidden text-ellipsis">
                                                {student.password || 'N/A'}
                                            </div>
                                            <button
                                                className="w-[5%] text-red-700 flex content-start text-2xl overflow-hidden text-ellipsis"
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setIsConfirmDelete(true);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 1 0 1.498.058l.347-9Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {isConfirmDelete && (
                                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                                    <div className="bg-white p-6 rounded-xl">
                                        <h2 className="text-xl mb-4">Are you sure you want to delete this student?</h2>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setIsConfirmDelete(false)}
                                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default RegisteredStudents;
