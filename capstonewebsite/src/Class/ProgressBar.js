import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
            <div
                style={{ width: `${progress}%` }}
                className="h-full bg-green-500 transition-all duration-300"
            />
        </div>
    );
};

export default ProgressBar;
