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
        const { name, branch, rollNumber, registrationNumber, issueDate, certificateImageHash } = attestationData;
        if (!name || !branch || !rollNumber || !registrationNumber || !issueDate || !certificateImageHash) {
            alert('All fields are required!');
            return;
        }

        // Create attestation
        const res = await client.createAttestation({
            schemaId: '0x1b', // Ensure this is the correct schema ID
            data: {
                name,
                branch,
                rollNumber,
                registrationNumber,
                issueDate,
                certificateImageHash,
            },
            indexingValue: signerAddress.toLowerCase()
        });

        // Handle response
        console.log('Create Attestation Response:', res);
        setTransactionHash(res.transactionHash);
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
        <button type="submit" className="button">
          Create Attestation
        </button>
      </form>
      {transactionHash && (
        <div className="transaction">
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
};

export default CreateAttestationsPage;
