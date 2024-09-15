import React, { useState, useEffect, useRef } from 'react';
import Progress from './Progress'; // Import Progress component

const Pomodoro = ({ pomodoroTime, breakTime }) => {
    const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60); // Default to pomodoroTime in seconds
    const [isActive, setIsActive] = useState(false);
    const [isPomodoro, setIsPomodoro] = useState(true); // Track if it's Pomodoro or Break time
    const bellSound = useRef(null); // Reference to the bell sound

    // Total time for the current session (Pomodoro or Break)
    const totalTime = isPomodoro ? pomodoroTime * 60 : breakTime * 60;

    // Update timeLeft when pomodoroTime or breakTime changes
    useEffect(() => {
        setTimeLeft(isPomodoro ? pomodoroTime * 60 : breakTime * 60);
    }, [pomodoroTime, breakTime, isPomodoro]);

    // Play bell sound and switch timers
    const handleTimerEnd = () => {
        if (bellSound.current && isActive) {
            bellSound.current.play(); // Play the bell sound
        }

        // Switch between Pomodoro and Break
        setIsPomodoro(!isPomodoro);

        // Automatically reset timer for the next cycle (Pomodoro or Break)
        setTimeLeft(isPomodoro ? breakTime * 60 : pomodoroTime * 60);
        setIsActive(true); // Automatically start the next timer
    };

    // Timer logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval); // Timer is done, stop the interval
            handleTimerEnd(); // Handle the timer end event (sound and switch)
        }
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isActive, timeLeft]);

    // Toggle start/stop of the timer
    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // Reset the timer to the appropriate time (Pomodoro or Break)
    const resetTimer = () => {
        setTimeLeft(isPomodoro ? pomodoroTime * 60 : breakTime * 60);
        setIsActive(false);
    };

    // Helper function to format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <audio ref={bellSound} src="/assets/bell.wav" preload="auto" /> {/* Bell sound */}
            
            {/* Progress Bar */}
            <Progress timeLeft={timeLeft} totalTime={totalTime} />

            {/* Pomodoro or Break Text */}
            <p className="text-sm text-gray-400 italic mb-2">
                {isPomodoro ? 'Pomodoro' : 'Break'}
            </p>
            
            {/* Timer */}
            <h1 className="text-6xl font-bold text-white mb-4">{formatTime(timeLeft)}</h1>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button 
                    onClick={toggleTimer} 
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button 
                    onClick={resetTimer} 
                    className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Pomodoro;