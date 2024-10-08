import React, { useState } from 'react';
import './attestations.css';
import { ethers } from 'ethers';
import { SignProtocolClient, SpMode, EvmChains } from '@ethsign/sp-sdk';

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider('https://alfajores-forno.celo-testnet.org');

// Initialize client with MetaMask or other provider (not using private key here)
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.celoAlfajores,
  // You can pass the wallet instance if necessary here, but if using MetaMask, it's not required
});

const CreateAttestationsPage = () => {
  const [attestationData, setAttestationData] = useState({
    name: '',
    branch: '',
    rollNumber: '',
    registrationNumber: '',
    issueDate: '',
    certificateImageHash: '',
    recipient: '', // New field for recipient's address
  });
  
  // State to hold the attestation response data
  const [attestationResponse, setAttestationResponse] = useState({
    attestationId: '',
    txHash: '',
    indexingValue: ''
  });
  const [transactionHash, setTransactionHash] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'rollNumber' || name === 'registrationNumber') && isNaN(value)) {
      alert(`${name} should be a number.`);
      return;
    }

    setAttestationData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAttestation = async () => {
    try {
      // Check for MetaMask
      if (!window.ethereum) {
        alert('MetaMask is not installed!');
        return;
      }

      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      // Validate form data
      const { name, branch, rollNumber, registrationNumber, issueDate, certificateImageHash, recipient } = attestationData;
      if (!name || !branch || !rollNumber || !registrationNumber || !issueDate || !certificateImageHash || !recipient) {
        alert('All fields are required!');
        return;
      }

      // Validate recipient address
      if (!ethers.utils.isAddress(recipient)) {
        alert('Invalid recipient address');
        return;
      }

      // Create attestation
      const res = await client.createAttestation({
        schemaId: '0x20', // Ensure this is the correct schema ID
        data: {
          name,
          branch,
          rollNumber,
          registrationNumber,
          issueDate,
          certificateImageHash,
          recipient, // Include recipient in the attestation data
        },
        indexingValue: recipient.toLowerCase(), // Use recipient's address as indexing value
      });

      // Handle response
      console.log('Create Attestation Response:', res);
      setAttestationResponse({
        attestationId: res.attestationId || '',
        txHash: res.txHash || '',
        indexingValue: res.indexingValue || ''
      });
      setTransactionHash(res.transactionHash || '');
      alert('Attestation created successfully!');

    } catch (error) {
      console.error('Error creating attestation:', error.message);
      alert('Failed to create attestation. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Create Attestation</h1>
      <form className="form" onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission
        handleCreateAttestation();
      }}>
        <label className="label">
          Name:
          <input
            type="text"
            name="name"
            value={attestationData.name}
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
            value={attestationData.branch}
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
            value={attestationData.rollNumber}
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
            value={attestationData.registrationNumber}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Issue Date:
          <input
            type="date"
            name="issueDate"
            value={attestationData.issueDate}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Certificate Image Hash (IPFS):
          <input
            type="text"
            name="certificateImageHash"
            value={attestationData.certificateImageHash}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Recipient Address:
          <input
            type="text"
            name="recipient"
            value={attestationData.recipient}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <button type="submit" className="button">
          Create Attestation
        </button>
      </form>

      {transactionHash && (
        <div className="transaction">
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}

      {/* Display attestation response data */}
      {attestationResponse.attestationId && (
        <div className="attestation-response">
          <h2>Attestation Created</h2>
          <p><strong>Attestation ID:</strong> {attestationResponse.attestationId}</p>
          <p><strong>Transaction Hash:</strong> {attestationResponse.txHash}</p>
          <p><strong>Indexing Value:</strong> {attestationResponse.indexingValue}</p>
        </div>
      )}
    </div>
  );
};

export default CreateAttestationsPage;
