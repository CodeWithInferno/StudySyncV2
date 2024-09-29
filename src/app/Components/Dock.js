import React from 'react';
import { FaHome, FaSearch, FaBell, FaUser, FaChartBar, FaCog } from 'react-icons/fa'; // Add FaCog for settings icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const Dock = ({ onImageClick, onSettingsClick, onGraphClick }) => {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 p-2 sm:p-4 rounded-lg sm:rounded-xl flex justify-between space-x-4 sm:space-x-6 shadow-lg backdrop-blur-md w-11/12 sm:w-auto max-w-md">
            <div className="relative group">
                <FaHome className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110" />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
            </div>
            <div className="relative group">
                <FaSearch className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110" />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Search</span>
            </div>
            <div className="relative group">
                <FaChartBar
                    className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={onGraphClick} 
                />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Pomodoro Stats</span>
            </div>
            <div className="relative group">
                <FaBell className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110" />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Notifications</span>
            </div>
            <div className="relative group">
                <FaUser className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110" />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Profile</span>
            </div>
            <div className="relative group">
                <FaCog
                    className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={onSettingsClick} 
                />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
            </div>
            <div className="relative group">
                <FontAwesomeIcon
                    icon={faImage}
                    className="text-white text-2xl sm:text-3xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={onImageClick}
                />
                <span className="absolute bottom-full mb-1 sm:mb-2 w-max px-2 py-1 text-xs sm:text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">Background</span>
            </div>
        </div>
    );
};

export default Dock;