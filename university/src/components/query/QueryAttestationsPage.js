import React, { useState } from 'react';
import axios from 'axios';
import './query.css';

const QueryAttestationsPage = () => {
  const [queryData, setQueryData] = useState({
    attester: '',
    indexingValue: '',
  });
  const [queryResults, setQueryResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function makeAttestationRequest(endpoint, options) {
    const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
    const res = await axios.request({
      url,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      ...options,
    });
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res));
    }
    return res.data;
  }

  async function queryAttestations() {
    try {
      const response = await makeAttestationRequest("index/attestations", {
        method: "GET",
        params: {
          mode: "onchain",
          schemaId: "0x1b", // Make sure this matches your schema ID
          attester: queryData.attester,
          indexingValue: queryData.indexingValue.toLowerCase(),
        },
      });

      if (!response.success) {
        return {
          success: false,
          message: response?.message ?? "Attestation query failed.",
        };
      }

      if (response.data?.total === 0) {
        return {
          success: false,
          message: "No attestation for this address found.",
        };
      }

      return {
        success: true,
        attestations: response.data.rows,
      };
    } catch (error) {
      console.error('Error querying attestations:', error);
      return {
        success: false,
        message: 'An error occurred while querying attestations.',
      };
    }
  }

  const handleQueryAttestation = async (e) => {
    e.preventDefault();
    const result = await queryAttestations();
    setQueryResults(result);
  };

  return (
    <div className="container">
      <h1>Query Attestations</h1>
      <form className="form" onSubmit={handleQueryAttestation}>
        <label className="label">
          Attester Address:
          <input
            type="text"
            name="attester"
            value={queryData.attester}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Indexing Value (Address):
          <input
            type="text"
            name="indexingValue"
            value={queryData.indexingValue}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <button type="submit" className="button">
          Query Attestation
        </button>
      </form>
      {queryResults && (
        <div className="results">
          <h2>Query Results</h2>
          {queryResults.success ? (
            <div>
              <p>Attestations found: {queryResults.attestations.length}</p>
              <ul>
                {queryResults.attestations.map((attestation, index) => (
                  <li key={index}>
                    <p>Attestation ID: {attestation.id}</p>
                    <p>Attester: {attestation.attester}</p>
                    <p>Recipient: {attestation.recipient}</p>
                    <p>Data: {JSON.stringify(attestation.data)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{queryResults.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryAttestationsPage;