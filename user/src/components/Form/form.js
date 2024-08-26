// src/pages/FormPage.js
import React, { useState } from 'react';
import './form.css';

const FormPage = () => {
  const initialFormData = {
    name: '',
    branch: '',
    rollNumber: '',
    registrationNumber: '',
    mailId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send data to university
      const response = await fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Form Data Submitted Successfully');
        // Clear the form after successful submission
        setFormData(initialFormData);
        // Optionally, redirect or inform the user
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Form Submission</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Roll Number:
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Mail ID:
          <input
            type="email"
            name="mailId"
            value={formData.mailId}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
