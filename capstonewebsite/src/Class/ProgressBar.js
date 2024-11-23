import React from 'react';

const ProgressBar = ({ progress }) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100); 
  
  return (
    <div className="relative w-full h-6 bg-gray-300 rounded-full">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-black text-sm">
        {progressPercentage}%
      </span>
    </div>
  );
};

export default ProgressBar;
