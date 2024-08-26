// src/components/Welcome/welcome.js
import React from 'react';
import './welcome.css'; // Import the CSS file
import logo from '../../components/assets/Asserta-l.png'; // Adjust the path as needed


const WelcomePage = ({ walletAddress, onLogout }) => {  // Accept onLogout as a prop
  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="University Logo" className="logo" />
        <h1 className="title">Welcome to University Certificate System</h1>
        {walletAddress && (
          <>
            <p className="walletAddress">
              Connected Wallet Address: <strong>{walletAddress}</strong>
            </p>
            <button className="logoutButton" onClick={onLogout}>Log Out</button> {/* Log Out Button */}
          </>
        )}
      </header>
      <main className="main">
        <section className="aboutSection">
          <h2>About This Project</h2>
          <p>
            This application allows students and university staff to request, generate, and manage certificates securely using blockchain technology.
          </p>
        </section>
        <section className="featuresSection">
          <h2>Key Features</h2>
          <ul className="featuresList">
            <li>Request and generate certificates seamlessly</li>
            <li>Secure storage and verification of certificates using blockchain</li>
            <li>Decentralized storage of certificates via IPFS</li>
            <li>User-friendly interface for easy navigation</li>
            <li>Immutable records of certificate issuance and attestation</li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p>© 2024 University Certificate System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;