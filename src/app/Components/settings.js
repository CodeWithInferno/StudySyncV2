import React, { useState } from 'react';

const Settings = ({ isSettingsVisible, toggleSettings, onSaveSettings }) => {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);

    const handleSave = () => {
        onSaveSettings(pomodoroTime, breakTime);
        toggleSettings();
    };

    return (
        <div>
            {isSettingsVisible && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
                    style={{ zIndex: 50 }} // Set high z-index for the popup
                >
                    <div className="bg-gray-800 p-6 rounded shadow-lg relative w-full max-w-md h-auto">
                        <span
                            className="absolute top-2 right-2 text-gray-500 cursor-pointer text-xl"
                            onClick={toggleSettings}
                        >
                            &times;
                        </span>
                        <p className="text-white text-center mb-4">Settings</p>
                        <div className="mb-4">
                            <label className="text-white">Pomodoro Time (min):</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg"
                                value={pomodoroTime}
                                onChange={(e) => setPomodoroTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white">Break Time (min):</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg"
                                value={breakTime}
                                onChange={(e) => setBreakTime(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;