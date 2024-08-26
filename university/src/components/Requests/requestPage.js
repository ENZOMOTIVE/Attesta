// src/pages/requestPage.js
import React, { useEffect, useState } from 'react';
import './request.css'; // Add a CSS file to style the boxes

const RequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-form-data');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleToggle = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].expanded = !updatedRequests[index].expanded;
    setRequests(updatedRequests);
  };

  return (
    <div className="notification-container">
      {requests.map((request, index) => (
        <div key={index} className="notification-box">
          <h2>{request.name}</h2>
          <p>{request.mailId}</p>
          <button onClick={() => handleToggle(index)} className="view-more-button">
            {request.expanded ? 'View Less' : 'View More'}
          </button>
          {request.expanded && (
            <div className="notification-details">
              <p><strong>Branch:</strong> {request.branch}</p>
              <p><strong>Roll Number:</strong> {request.rollNumber}</p>
              <p><strong>Registration Number:</strong> {request.registrationNumber}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestPage;
