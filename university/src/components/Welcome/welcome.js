import React from 'react';
import './welcome.css'; // Import the CSS file
import logo from '../../components/assets/Asserta-l.png'; // Adjust the path as needed

const WelcomePage = ({ walletAddress, onLogout }) => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="University Logo" className="landing-logo" />
        <h1 className="landing-title">Welcome to Attesta: Sign Protocol based Issuance</h1>
        {walletAddress && (
          <div className="wallet-section">
            <p className="wallet-info">
              Connected Wallet Address: <strong>{walletAddress}</strong>
            </p>
            <button className="logout-button" onClick={onLogout}>Log Out</button>
          </div>
        )}
      </header>
      <main className="landing-main">
        <section className="about-section">
          <h2 className="section-title">About This Project</h2>
          <p className="section-description">
            This application allows students and university staff to request, generate, and manage certificates securely using blockchain technology.
          </p>
        </section>
        <section className="features-section">
          <h2 className="section-title">Key Features</h2>
          <ul className="features-list">
            <li className="feature-item">Request and generate certificates seamlessly</li>
            <li className="feature-item">Secure storage and verification of certificates using blockchain</li>
            <li className="feature-item">Decentralized storage of certificates via IPFS</li>
            <li className="feature-item">User-friendly interface for easy navigation</li>
            <li className="feature-item">Immutable records of certificate issuance and attestation</li>
          </ul>
        </section>
      </main>
      <footer className="landing-footer">
        <p> Made with ❤️ @ENZOMOTIVE </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
