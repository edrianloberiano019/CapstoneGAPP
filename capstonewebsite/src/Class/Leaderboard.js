import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Loading from "./Loading";
import { motion } from "framer-motion";

function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const storage = getStorage();

    const fetchProfileImage = async (email) => {
        try {
            const imageRef = ref(storage, `images/${email}.jpg`);
            return await getDownloadURL(imageRef);
        } catch (error) {
            console.error("Error fetching profile image:", error);
            return null; 
        }
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const playersCollection = collection(db, 'users');
                const playersQuery = query(playersCollection, orderBy("score", "desc"));
                const snapshot = await getDocs(playersQuery);

                const playersData = await Promise.all(snapshot.docs.map(async (doc) => {
                    const player = doc.data();
                    const profileImage = await fetchProfileImage(player.email);
                    return { id: doc.id, ...player, profileImage };
                }));

                setPlayers(playersData);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div className="pb-5">
            <div className="text-center text-4xl uppercase pb-1">Leaderboard</div>
            {loading ? (<Loading />) : (
                <motion.div className="p-6 rounded-lg w-full bg-[#00712D]"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <div className="flex justify-between mt-2 text-white mb-2 mr-16">
                        <div className="flex w-[40%]"></div>
                        <div className="flex text-center justify-evenly gap-20 w-[60%]">
                            <div className="w-full">PUZZLE</div>
                            <div className="w-full">CROSSWORD</div>
                            <div className="w-full">GAME 3</div>
                            <div className="w-full">Game 4</div>
                        </div>
                    </div>

                    {players.map((player, index) => (
                        <motion.div 
                            key={player.id} 
                            className={`bg-${index === 0 ? 'white' : '[#ffffff6e]'} p-6 ${index === 0 ? 'rounded-lg' : 'text-white gap-y-1'}`}
                            initial={{ opacity: 0, y: 20 }}  
                            animate={{ opacity: 1, y: 0 }}   
                            transition={{ duration: 0.5, delay: index * 0.2 }} 
                        >
                            <div className="flex justify-between mr-16">
                                <div className="w-[40%] flex items-center content-center">
                                    <div>{index + 1}</div>
                                    <img 
                                        className="ml-2 rounded-full w-[50px] h-[50px] drop-shadow-md" 
                                        alt="profile" 
                                        src={player.profileImage || '/defaultProfile.png'} 
                                    />
                                    <div className="ml-5">{player.firstName} {player.lastName}</div>
                                </div>
                                <div className="flex items-center justify-evenly gap-x-20 w-[60%]">
                                    <div className="w-full flex justify-center">{player.puzzleScore || 0}</div>
                                    <div className="w-full flex justify-center">{player.crosswordScore || 0}</div>
                                    <div className="w-full flex justify-center">{player.game3Score || 0}</div>
                                    <div className="w-full flex justify-center">{player.game4Score || 0}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default Leaderboard;
