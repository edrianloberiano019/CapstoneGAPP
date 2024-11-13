import React from 'react';

const CircleProgress = ({ progress, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg
        className="rotate-90"
        width={size}
        height={size}
      >
        <circle
          stroke="#e5e7eb" 
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="green" 
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute text-sm font-normal text-green-700">
        {progress}%
      </span>
    </div>
  );
};

export default CircleProgress;
