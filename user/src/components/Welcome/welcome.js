import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'; // Import the CSS file

const WelcomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the University Form Submission</h1>
      <p>Please proceed to the form submission page.</p>
      <Link to="/form" className="link">Request Certificate</Link> 
      <Link to="/display" className="link">Dashboard</Link>

    </div>
  );
};

export default WelcomePage;
