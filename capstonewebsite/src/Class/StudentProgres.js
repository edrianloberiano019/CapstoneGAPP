import React, { useEffect, useState } from "react";
import backgroundImage from '../images/bg.jpg';
import { motion } from 'framer-motion';
import CircleProgress from '../Class/CicleProgress';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Loading from "./Loading";

function StudentProgres() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const playersCollection = collection(db, 'users');
                const playersQuery = query(playersCollection, orderBy("score", "desc"));
                const snapshot = await getDocs(playersQuery);

                const playersData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        puzzleProgress: (data.puzzleScore / 200),
                        crosswordProgress: (data.crosswordScore / 200),
                    };
                });

                setPlayers(playersData);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <motion.div className=' w-full rounded-lg overflow-hidden' style={appStyle}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}>
            <div className='bg-[#00712d9c] p-5 w-full h-full'>
                <div className='bg-[#ffffffe8] w-full p-5 rounded-lg'>
                    <div className='flex justify-between items-center content-center '>
                        <div className="">Student Progress</div>
                        <div className='flex gap-5'>
                            <div className='flex  bg-gray-300 px-2 rounded-xl overflow-hidden'>
                                <input className='outline-none text-2xl bg-transparent px-4 w-full' placeholder='Search' type='search' />
                                <button className='px-4 text=2xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <button className='py-1 text-2xl px-3 duration-500 drop-shadow-md bg-green-500 rounded-lg hover:text-white hover:bg-green-700 '>Download</button>
                        </div>
                    </div>
                    <div className='mb-4 text-2xl flex justify-between mt-8 pb-1 px-4 border-b-2 border-gray-500 '>
                        <div>Name</div>
                        <div className="flex gap-x-10">
                            <div>Puzzle</div>
                            <div>Crossword</div>
                            <div>Journal</div>
                        </div>
                    </div>

                    {players.map((player) => (
                        <div key={player.id} className='flex text-2xl mb-5 justify-between items-center content-center px-4 pr-6 '>
                            <div className="flex content-center">{player.firstName} {player.lastName}</div>
                            <div className="flex gap-x-10">
                                <div className="flex flex-col items-center px-3 justify-center space-y-4">
                                    <CircleProgress progress={player.puzzleProgress || 0} size={50} strokeWidth={6} />
                                </div>
                                <div className="flex flex-col items-center px-3 justify-center space-y-4">
                                    <CircleProgress progress={player.crosswordProgress || 0} size={50} strokeWidth={6} />
                                </div>
                                <div className="flex flex-col items-center pl-4 pr-2 justify-center space-y-4">
                                    <CircleProgress progress={player.journalProgress || 0} size={50} strokeWidth={6} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default StudentProgres;
