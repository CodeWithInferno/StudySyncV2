'use client';
import React, { useState } from 'react';
import Dock from './Components/Dock';
import Background from './Components/Background';
import Settings from './Components/settings'; // Import the Settings component
import Pomodoro from './Components/pomodoro'; // Import the Pomodoro component
import NoSleepButton from './Components/NoSleep'; // Import NoSleep button

const Page = () => {
    // Set the default background image to 1.jpg
    const [backgroundImage, setBackgroundImage] = useState('/assets/1.jpg');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25); // Default Pomodoro Time
    const [breakTime, setBreakTime] = useState(5); // Default Break Time

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const toggleSettings = () => {
        setSettingsVisible(!isSettingsVisible);
    };

    const handleImageSelect = (image) => {
        setBackgroundImage(image); // Set selected image as background
        setPopupVisible(false); // Close the popup when an image is selected
    };

    const handleSaveSettings = (pomodoro, breakTime) => {
        setPomodoroTime(pomodoro); // Save Pomodoro time
        setBreakTime(breakTime); // Save Break time
    };

    return (
        <div
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <NoSleepButton /> {/* Add NoSleep Button */}
            <Dock onImageClick={togglePopup} onSettingsClick={toggleSettings} />
            <Background
                isPopupVisible={isPopupVisible}
                togglePopup={togglePopup}
                onImageSelect={handleImageSelect}
            />
            <Settings
                isSettingsVisible={isSettingsVisible}
                toggleSettings={toggleSettings}
                onSaveSettings={handleSaveSettings}
            />
            <Pomodoro pomodoroTime={pomodoroTime} breakTime={breakTime} /> {/* Pass breakTime to Pomodoro */}
        </div>
    );
};

export default Page;