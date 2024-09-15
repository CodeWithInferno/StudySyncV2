import React, { useState, useRef } from 'react';
import NoSleep from 'nosleep.js'; // Import NoSleep.js

const NoSleepButton = () => {
    const [isNoSleepEnabled, setIsNoSleepEnabled] = useState(false); // State to track NoSleep status
    const noSleepRef = useRef(null); // Reference for NoSleep instance

    const toggleNoSleep = () => {
        if (!isNoSleepEnabled) {
            // Enable NoSleep
            noSleepRef.current = new NoSleep();
            noSleepRef.current.enable(); // Enable NoSleep.js
            setIsNoSleepEnabled(true);
        } else {
            // Disable NoSleep
            if (noSleepRef.current) {
                noSleepRef.current.disable(); // Disable NoSleep.js
            }
            setIsNoSleepEnabled(false);
        }
    };

    return (
        <div className="fixed top-4 left-4 flex items-center">
            {/* Toggle Button */}
            <button
                onClick={toggleNoSleep}
                className={`bg-${isNoSleepEnabled ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-${isNoSleepEnabled ? 'green' : 'red'}-600 transition-all`}
            >
                {isNoSleepEnabled ? 'Disable NoSleep' : 'Enable NoSleep'}
            </button>
            {/* Status Text */}
            <span className="ml-4 text-sm text-gray-300 italic">
                {isNoSleepEnabled ? 'NoSleep is active' : 'NoSleep is inactive'}
            </span>
        </div>
    );
};

export default NoSleepButton;