import React from "react";

function Leaderboard() {
  return (
    <div className="p-6 rounded-lg   w-full bg-[#00712D]">
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between ">
                    <div className=" text-black text-4xl ">Leaderboard</div>
                    <div className="text-black">Overall</div>
                </div>
                <div className="flex  justify-between mt-16 text-black mr-16">
                    <div className="flex w-[40%]">
                    <div className="flex text-left  ">NAME</div>
                    </div>
                    <div className="flex justify-evenly gap-20 w-[60%]">
                    <div className="w-full text-left">PUZZLE</div>
                    <div className="w-full">CROSSWORD</div>
                    <div className="w-full">GAME 3</div>
                    <div className="w-full">Game 4</div>
                    </div>
                </div>

                <div className="flex justify-between mt-5 mr-16">
                    <div className="text-black w-[40%]">
                    <div>Christine Gonzales</div>
                    </div>
                    <div className="flex text-blacck justify-evenly gap-20 w-[60%]">
                    <div className="w-full flex">
                        <div className="mr-2 ">1</div>
                        <div>Points</div>
                    </div>
                    <div className="flex w-full">
                        <div className="mr-2 ">1</div>
                        <div>Points</div>
                    </div>    
                    <div className="flex w-full">
                        <div className="mr-2 ">1</div>
                        <div>Points</div>
                    </div>
                    <div className="flex w-full   ">
                        <div className="mr-2 ">1</div>
                        <div>Points</div>
                    </div>
                    </div>
                </div>

        </div>
      
    </div>
  );
}

export default Leaderboard;
