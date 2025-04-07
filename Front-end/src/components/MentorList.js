import React, { useEffect, useState } from 'react';
import { getMentors } from '../services/api';

function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getMentors();
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  if (loading) return <p>Loading mentors...</p>;

  return (
    <div>
      <h2>Available Mentors</h2>
      {mentors.length === 0 ? (
        <p>No mentors available.</p>
      ) : (
        mentors.map(mentor => (
          <div key={mentor.id}>
            <h3>{mentor.name}</h3>
            <p>Expertise: {mentor.expertise}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MentorList;