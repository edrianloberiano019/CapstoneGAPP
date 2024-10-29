import React from "react";
import profile from '../images/ch1.png'

function Leaderboard() {
    return (
        <div className="p-6 rounded-lg   w-full bg-[#00712D]">
            <div className="flex  justify-between  mt-2 text-white mb-2 mr-16">
                <div className="flex w-[40%]">
                </div>
                <div className="flex text-center justify-evenly gap-20 w-[60%]">
                    <div className="w-full">PUZZLE</div>
                    <div className="w-full">CROSSWORD</div>
                    <div className="w-full">GAME 3</div>
                    <div className="w-full">Game 4</div>
                </div>
            </div>
            <div>
                <div className="bg-white p-6 rounded-t-lg">

                    <div className="flex justify-between mt-5 mr-16">

                        <div className="text-black w-[40%] flex items-center">
                            <img className="rounded-full w-[70px] h-[70px] drop-shadow-md" alt="profile" src={profile} />
                            <div className="ml-5">Christine Gonzales</div>
                        </div>
                        <div className="flex text-black items-center justify-evenly  gap-20 w-[60%]">
                            <div className="w-full flex justify-center">
                                <div className="mr-2 ">1</div>
                            </div>
                            <div className="flex w-full justify-center">
                                <div className="mr-2 ">1</div>
                            </div>
                            <div className="flex w-full justify-center">
                                <div className="mr-2 ">1</div>
                            </div>
                            <div className="flex w-full justify-center   ">
                                <div className="mr-2">1</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-[#ffffff6e] p-6 rounded-b-lg">

                    <div className="">
                        <div className="flex justify-between text-2xl mt-1 mr-16">
                            <div className="text-black w-[40%] flex items-center">
                                <div>2</div>

                                <img className="ml-2 rounded-full w-[50px] h-[50px] drop-shadow-md" alt="profile" src={profile} />
                                <div className="ml-5 text-2xl">Edrian Loberiano</div>
                            </div>
                            <div className="flex text-black items-center justify-evenly  gap-20 w-[60%]">
                                <div className="w-full flex justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center   ">
                                    <div className="mr-2">0</div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="flex justify-between text-2xl mt-5 mr-16">
                            <div className="text-black w-[40%] flex items-center">
                                <div>3</div>
                                <img className="ml-2 rounded-full w-[50px] h-[50px] drop-shadow-md" alt="profile" src={profile} />
                                <div className="ml-5">Johsua Villegas</div>
                            </div>
                            <div className="flex text-black items-center justify-evenly  gap-20 w-[60%]">
                                <div className="w-full flex justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center   ">
                                    <div className="mr-2">0</div>
                                </div>
                            </div>
                        
                        </div>
                        
                        <div className="flex justify-between text-2xl mt-5 mr-16">
                            <div className="text-black w-[40%] flex items-center">
                                <div>3</div>
                                <img className="ml-2 rounded-full w-[50px] h-[50px] drop-shadow-md" alt="profile" src={profile} />
                                <div className="ml-5">Christian Dalida</div>
                            </div>
                            <div className="flex text-black items-center justify-evenly  gap-20 w-[60%]">
                                <div className="w-full flex justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <div className="mr-2 ">0</div>
                                </div>
                                <div className="flex w-full justify-center   ">
                                    <div className="mr-2">0</div>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>

                </div>
            
            </div>

            

        </div>
    );
}

export default Leaderboard;
