import React from 'react';

const Progress = ({ timeLeft, totalTime }) => {
    // Calculate the percentage of time passed
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    return (
        <div className="w-full flex items-center mb-4">
            {/* Progress bar container */}
            <div className="relative w-full h-1 bg-gray-300 rounded-lg overflow-hidden">
                {/* Progress bar fill */}
                <div
                    className="absolute h-4 bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {/* Percentage text */}
            <span className="ml-4 text-sm text-gray-400">{Math.round(percentage)}%</span>
        </div>
    );
};

export default Progress;