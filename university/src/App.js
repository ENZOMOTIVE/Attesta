import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react' ;

// Linking to the pages
import WelcomePage from './components/Welcome/welcome';
import RequestPage from './components/Requests/requestPage';
import GenerateCertificatePage from './components/Generate/generate';
import CreateAttestationsPage from './components/Attestations/attestation';
import Sidebar from './components/sidebar/sidebar';
import LoginPage from './components/LoginPage/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (address) => {
    setWalletAddress(address);
    setIsAuthenticated(true);
    localStorage.setItem('walletAddress', address);
  };

  const handleLogout = () => {
    setWalletAddress('');
    setIsAuthenticated(false);
    localStorage.removeItem('walletAddress');
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<WelcomePage walletAddress={walletAddress} onLogout={handleLogout} />} />
              <Route path="/request" element={<RequestPage />} />
              <Route path="/generate" element={<GenerateCertificatePage />} />
              <Route path="/attest" element={<CreateAttestationsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div style={styles.centeredContainer}>
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    marginLeft: '200px', // to account for the sidebar width
    padding: '20px',
    width: '100%',
  },
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
};

export default App;