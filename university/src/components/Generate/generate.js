import React, { useState } from 'react';
import axios from 'axios';
import './generate.css';  // Import the CSS file for styles

const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_API_KEY = '32563ac6a9fb8295d091';
const PINATA_SECRET_API_KEY = 'a5b2b0c7b0c5d49cc1ed24d4088b99b2377c87dd088a3eba544377819dda2a36';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(PINATA_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        },
      });

      setHash(response.data.IpfsHash);
    } catch (error) {
      console.error('Error uploading image to Pinata:', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Image to Pinata</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {hash && (
        <div className="image-preview">
          <p>IPFS Hash: {hash}</p>
          <img src={`https://ipfs.io/ipfs/${hash}`} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
