import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Linking to the pages
import WelcomePage from './components/Welcome/welcome';
import RequestPage from './components/Requests/requestPage';
import GenerateCertificatePage from './components/Generate/generate';
import CreateAttestationsPage from './components/Attestations/attestation';
import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/generate" element={<GenerateCertificatePage />} />
            <Route path="/attest" element={<CreateAttestationsPage />} />
          </Routes>
        </div>
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
};

export default App;
