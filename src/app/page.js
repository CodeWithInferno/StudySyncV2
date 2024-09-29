'use client';
import React, { useEffect, useState } from 'react';
import Dock from './Components/Dock';
import Background from './Components/Background';
import Settings from './Components/settings'; // Import the Settings component
import Pomodoro from './Components/pomodoro'; // Import the Pomodoro component
import NoSleepButton from './Components/NoSleep'; // Import NoSleep button
import UserProfile from './Components/Graphs/UserProfile'; // Import UserProfile for Pomodoro stats
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 user hook
import client from './sanityClient'; // Import Sanity client
import Ambience from './Components/Ambience'; // Import Ambience component

const Page = () => {
    const [backgroundImage, setBackgroundImage] = useState('/assets/1.jpg');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const [isGraphVisible, setGraphVisible] = useState(false); // State for UserProfile popup
    const [pomodoroTime, setPomodoroTime] = useState(25); // Default Pomodoro Time
    const [breakTime, setBreakTime] = useState(5); // Default Break Time
    const [pomodoroSessions, setPomodoroSessions] = useState([]); // Track Pomodoro sessions

    // Get Auth0 user and authentication state
    const { user, isLoading } = useUser();

    // Sanity: Save or update user data in Sanity
    useEffect(() => {
        if (!isLoading && user) {
            console.log("User object:", user); // Log user object for debugging

            const saveOrUpdateUserData = async () => {
                try {
                    // Check if the user already exists in Sanity using their email
                    const query = `*[_type == "user" && email == $email][0]`;
                    const params = { email: user.email };
                    const existingUser = await client.fetch(query, params);

                    if (existingUser) {
                        // If the user exists, update the lastLogin field
                        console.log("Updating last login for existing user in Sanity...");
                        await client
                            .patch(existingUser._id) // Use the existing user's ID
                            .set({ lastLogin: new Date().toISOString() })
                            .commit();
                        console.log("Last login updated successfully!");
                    } else {
                        // If the user does not exist, create a new user document in Sanity
                        console.log("Creating new user document in Sanity...");
                        await client.create({
                            _type: 'user',
                            name: user.name,
                            email: user.email,
                            lastLogin: new Date().toISOString(),
                            profileImage: user.picture || '',
                        });
                        console.log("User data saved successfully!");
                    }
                } catch (error) {
                    console.error("Error writing document to Sanity:", error);
                }
            };

            saveOrUpdateUserData();
        }
    }, [user, isLoading]);

    // Save or update the Pomodoro session in Sanity
    const trackPomodoroSession = async (sessionTime) => {
        if (!user) return;

        try {
            const query = `*[_type == "progress" && user._ref == $userId][0]`;
            const params = { userId: user.sub };
            const existingProgress = await client.fetch(query, params);

            if (existingProgress) {
                // If progress exists, update it
                const updatedSessions = [...existingProgress.sessions, { duration: sessionTime, completedAt: new Date().toISOString() }];
                const totalPomodoros = existingProgress.totalPomodoros + 1;
                const totalTime = existingProgress.totalTime + sessionTime;

                await client
                    .patch(existingProgress._id) // Use the existing progress document's ID
                    .set({
                        sessions: updatedSessions,
                        totalPomodoros,
                        totalTime,
                    })
                    .commit();
                console.log('Pomodoro session updated successfully!');
            } else {
                // If progress doesn't exist, create a new progress document
                await client.create({
                    _type: 'progress',
                    user: { _type: 'reference', _ref: user.sub }, // Reference to the user document
                    totalPomodoros: 1,
                    totalTime: sessionTime,
                    sessions: [
                        { duration: sessionTime, completedAt: new Date().toISOString() },
                    ],
                });
                console.log('New progress document created!');
            }
        } catch (error) {
            console.error('Error updating Pomodoro progress:', error);
        }
    };

    // Toggle popup visibility for Pomodoro settings
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    // Toggle settings visibility
    const toggleSettings = () => {
        setSettingsVisible(!isSettingsVisible);
    };

    // Toggle graph visibility (Pomodoro stats)
    const toggleGraph = () => {
        setGraphVisible(!isGraphVisible); // Toggle the graph popup visibility
    };

    // Handle image selection for background
    const handleImageSelect = (image) => {
        setBackgroundImage(image); // Set selected image as background
        setPopupVisible(false); // Close the popup when an image is selected
    };

    // Save Pomodoro and break settings
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
                position: 'relative',
            }}
        >
            <NoSleepButton /> {/* Add NoSleep Button */}
            <Dock
                onImageClick={togglePopup}
                onSettingsClick={toggleSettings}
                onGraphClick={toggleGraph} // Pass the graph toggle to Dock
            />
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
            <Pomodoro
                pomodoroTime={pomodoroTime}
                breakTime={breakTime}
                onTrack={trackPomodoroSession} // Pass the Pomodoro tracking function
            />
            <UserProfile
                isPopupVisible={isGraphVisible} // Display UserProfile when graph icon is clicked
                togglePopup={toggleGraph}
                pomodoroSessions={pomodoroSessions} // Pass the Pomodoro session data
            />

            {/* Conditional rendering for user authentication */}
            <div className="fixed top-4 right-4 flex items-center space-x-4">
                {isLoading ? (
                    <p className="text-white">Loading...</p>
                ) : user ? (
                    // Display user profile picture and name if logged in
                    <>
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border border-white"
                        />
                        <span className="text-white">{user.name}</span>
                        <button
                            className="bg-red-500 text-white py-1 px-4 rounded-full transition-all hover:bg-red-600"
                            onClick={() => window.location.href = '/api/auth/logout'}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    // Show Sign In and Sign Up buttons if not logged in
                    <>
                        <button
                            className="bg-transparent border border-white text-white py-1 px-4 rounded-full transition-all hover:bg-white hover:text-black"
                            onClick={() => window.location.href = '/api/auth/login'} // Placeholder for login route
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-white text-black py-1 px-4 rounded-full transition-all hover:bg-transparent hover:text-white hover:border-white border-black"
                            onClick={() => window.location.href = '/api/auth/signup'} // Placeholder for signup route
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;