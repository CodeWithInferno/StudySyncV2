import React from 'react';

const Background = ({ isPopupVisible, togglePopup, onImageSelect }) => {
    return (
        <div>
            {isPopupVisible && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
                    style={{ zIndex: 50 }} // Set high z-index for the popup
                >
                    <div className="bg-gray-800 p-6 rounded shadow-lg relative w-full max-w-md h-auto">
                        <span
                            className="absolute top-2 right-2 text-gray-500 cursor-pointer text-xl"
                            onClick={togglePopup}
                        >
                            &times;
                        </span>
                        <p className="text-white text-center mb-4">Select a background image:</p>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <img
                                src="/assets/1.jpg"
                                alt="Image 1"
                                className="h-40 w-full object-cover cursor-pointer"
                                onClick={() => onImageSelect('/assets/1.jpg')}
                            />
                            <img
                                src="/assets/2.jpg"
                                alt="Image 2"
                                className="h-40 w-full object-cover cursor-pointer"
                                onClick={() => onImageSelect('/assets/2.jpg')}
                            />
                            <img
                                src="/assets/3.jpg"
                                alt="Image 3"
                                className="h-40 w-full object-cover cursor-pointer"
                                onClick={() => onImageSelect('/assets/3.jpg')}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Background;