import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile: ' + (err.response?.data?.detail || err.message));
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      {profile.expertise && <p>Expertise: {profile.expertise}</p>}
    </div>
  );
}

export default Profile;