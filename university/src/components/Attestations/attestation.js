// src/pages/CreateAttestationsPage.js
import React, { useState } from 'react';

const CreateAttestationsPage = () => {
  const [attestationData, setAttestationData] = useState({
    name: '',
    branch: '',
    rollNumber: '',
    registrationNumber: '',
    mailId: '',
    issueDate: '',
    certificateImageHash: '',
  });

  const handleChange = (e) => {
    setAttestationData({
      ...attestationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAttestation = () => {
    // Logic to create attestation using Sign Protocol
    console.log('Attestation Data:', attestationData);
    // Logic to save attestation to the blockchain
  };

  return (
    <div style={styles.container}>
      <h1>Create Attestation</h1>
      <form style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={attestationData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Branch:
          <input
            type="text"
            name="branch"
            value={attestationData.branch}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Roll Number:
          <input
            type="text"
            name="rollNumber"
            value={attestationData.rollNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={attestationData.registrationNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Mail ID:
          <input
            type="email"
            name="mailId"
            value={attestationData.mailId}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Issue Date:
          <input
            type="date"
            name="issueDate"
            value={attestationData.issueDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Certificate Image Hash (IPFS):
          <input
            type="text"
            name="certificateImageHash"
            value={attestationData.certificateImageHash}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <button type="button" onClick={handleCreateAttestation} style={styles.button}>Create Attestation</button>
      </form>
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
    backgroundColor: '#ffffff',
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CreateAttestationsPage;
