import React from 'react';
import MentorList from '../components/MentorList';

function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Student Mentorship Platform</h1>
      <MentorList />
    </div>
  );
}

export default Home;