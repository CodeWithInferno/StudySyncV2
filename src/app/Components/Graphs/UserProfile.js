import React from 'react';
import Progress from '../Graphs/progress'; // Import Progress component

const UserProfile = ({ isPopupVisible, togglePopup, userId }) => {
  return (
    <div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg relative w-2/4 h-3/4 overflow-y-auto">
            <span 
              className="absolute top-2 right-2 text-gray-500 cursor-pointer text-xl" 
              onClick={togglePopup}
            >
              &times;
            </span>
            <h2 className="text-white text-2xl mb-4">User Profile</h2>

            {/* Display user progress via the Progress component */}
            <Progress userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;