import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      {profile ? (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
          {profile.role === 'student' && <p>Mentor: {profile.mentor || 'Not assigned'}</p>}
        </>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
}

export default StudentDashboard;