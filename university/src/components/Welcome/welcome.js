
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to University Certification System</h1>
      <p>Select an option to proceed.</p>
      <Link to="/request" style={styles.link}>Request Certificate</Link>
      <Link to="/generate" style={styles.link}>Generate Certificate</Link>
      <Link to="/attest" style={styles.link}>Create Attestations</Link>
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
    marginTop: '10px',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default WelcomePage;
