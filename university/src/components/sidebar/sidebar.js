import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <Link to="/" style={styles.link}>Welcome</Link>
      <Link to="/request" style={styles.link}>Request Notifications</Link>
      <Link to="/generate" style={styles.link}>Generate Certificate</Link>
      <Link to="/attest" style={styles.link}>Create Attestations</Link>
    </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    width: '200px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '20px',
    fontSize: '18px',
  },
};

export default Sidebar;