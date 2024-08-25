// src/pages/GenerateCertificatePage.js
import React, { useState } from 'react';

const GenerateCertificatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    rollNumber: '',
    registrationNumber: '',
    mailId: '',
  });
  const [certificateImage, setCertificateImage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateCertificate = () => {
    // Simulate certificate generation
    const image = 'path_to_generated_certificate_image'; // Replace with actual certificate generation logic
    setCertificateImage(image);
    console.log('Certificate Generated:', formData, image);
  };

  return (
    <div style={styles.container}>
      <h1>Generate Certificate</h1>
      <form style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.branch}
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
            value={formData.rollNumber}
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
            value={formData.registrationNumber}
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
            value={formData.mailId}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <button type="button" onClick={handleGenerateCertificate} style={styles.button}>Generate Certificate</button>
      </form>
      {certificateImage && (
        <div style={styles.certificateContainer}>
          <h2>Generated Certificate</h2>
          <img src={certificateImage} alt="Certificate" style={styles.certificateImage} />
        </div>
      )}
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  certificateContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  certificateImage: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default GenerateCertificatePage;
