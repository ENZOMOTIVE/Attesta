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
    const checkAuthentication = () => {
      const storedWalletAddress = localStorage.getItem('walletAddress');
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = (address) => {
    setWalletAddress(address);
    setIsAuthenticated(true);
    localStorage.setItem('walletAddress', address);
  };

  return (
    <Router>
      <div style={styles.container}>
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div style={styles.content}>
              <div style={styles.walletAddress}>
                Connected Wallet: {walletAddress}
              </div>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/generate" element={<GenerateCertificatePage />} />
                <Route path="/attest" element={<CreateAttestationsPage />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        )}
      </div>
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
  walletAddress: {
    marginBottom: '20px',
    fontWeight: 'bold',
  },
};

export default App;