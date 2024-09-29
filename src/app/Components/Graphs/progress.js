import React, { useEffect, useState } from 'react';
import client from '../../sanityClient'; // Import Sanity client

const Progress = ({ userId }) => {
  const [progressData, setProgressData] = useState(null);

  // Fetch user's Pomodoro progress from Sanity
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const query = `*[_type == "progress" && user._ref == $userId][0]`;
        const params = { userId };
        const result = await client.fetch(query, params);

        if (result) {
          setProgressData(result);
        } else {
          console.log('No progress data found');
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  if (!progressData) {
    return <p>Loading progress...</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white">Pomodoro Progress</h3>
      <p className="text-white">Total Pomodoros: {progressData.totalPomodoros}</p>
      <p className="text-white">Total Time: {progressData.totalTime} minutes</p>

      <h4 className="mt-4 text-white">Sessions:</h4>
      <ul className="text-white">
        {progressData.sessions.map((session, index) => (
          <li key={index}>
            Session {index + 1}: {session.duration} minutes (Completed: {new Date(session.completedAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;