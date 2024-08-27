import React, { useState } from 'react';
import { ethers } from 'ethers';
import './attestations.css';

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
  const [transactionHash, setTransactionHash] = useState('');

  const handleChange = (e) => {
    setAttestationData({
      ...attestationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAttestation = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Initialize provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Define the smart contract address and ABI
      const contractAddress = '0x3ded9addbf7c46db95bd9faa339d0595c17557ad';
      const contractABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "attestationId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "branch",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "rollNumber",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "registrationNumber",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "issueDate",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "certificateImageHash",
              "type": "string"
            }
          ],
          "name": "AttestationCreated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "attestationCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "attestations",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "branch",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "rollNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "registrationNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "issueDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "certificateImageHash",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_branch",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_rollNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_registrationNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_issueDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_certificateImageHash",
              "type": "string"
            }
          ],
          "name": "createAttestation",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      // Initialize the contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Send transaction to create attestation
      const tx = await contract.createAttestation(
        attestationData.name,
        attestationData.branch,
        attestationData.rollNumber,
        attestationData.registrationNumber,
        attestationData.issueDate,
        attestationData.certificateImageHash
      );

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      // Set transaction hash
      setTransactionHash(receipt.transactionHash);

      console.log('Transaction Hash:', receipt.transactionHash);
    } catch (error) {
      console.error('Error creating attestation:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create Attestation</h1>
      <form className="form">
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
        <button type="button" onClick={handleCreateAttestation} className="button">
          Create Attestation
        </button>
      </form>
      {transactionHash && (
        <div className="transaction-hash">
          <p>Transaction successful! Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
};

export default CreateAttestationsPage;
