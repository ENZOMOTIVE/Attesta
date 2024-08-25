
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the University Form Submission</h1>
      <p>Please proceed to the form submission page.</p>
      <Link to="/form" style={styles.link}>Go to Form</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  link: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default WelcomePage;
