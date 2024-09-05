import React, { useState } from 'react';
import axios from 'axios';
import './query.css';

const QueryAttestationsPage = () => {
  const [queryData, setQueryData] = useState({
    indexingValue: '',
    attestationId: '',
    transactionHash: ''
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
      const params = {
        mode: "onchain",
        schemaId: "onchain_evm_44787_0x20", // Replace with your actual schema ID
        ...(queryData.indexingValue && { indexingValue: queryData.indexingValue.toLowerCase() }),
        ...(queryData.attestationId && { attestationId: queryData.attestationId }),
        ...(queryData.transactionHash && { transactionHash: queryData.transactionHash }),
      };

      const response = await makeAttestationRequest("index/attestations", {
        method: "GET",
        params,
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
          message: "No attestation found for the given query.",
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
    <div>
      <h2>Query Attestations</h2>
      <form onSubmit={handleQueryAttestation}>
        <label>Indexing Value (Address):</label>
        <input
          type="text"
          name="indexingValue"
          value={queryData.indexingValue}
          onChange={handleChange}
        />
        <label>Attestation ID:</label>
        <input
          type="text"
          name="attestationId"
          value={queryData.attestationId}
          onChange={handleChange}
        />
        <label>Transaction Hash:</label>
        <input
          type="text"
          name="transactionHash"
          value={queryData.transactionHash}
          onChange={handleChange}
        />
        <button type="submit">Query Attestation</button>
      </form>

      {queryResults && (
        <div className="query-results">
          <h3>Query Results</h3>
          {queryResults.success ? (
            <div>
              <p>Attestations found: {queryResults.attestations.length}</p>
              {queryResults.attestations.map((attestation, index) => (
                <div className="attestation-item" key={index}>
                  <p><strong>Attestation ID:</strong> {attestation.id}</p>
                  <p><strong>Attester:</strong> {attestation.attester}</p>
                  <p><strong>Recipient:</strong> {attestation.recipient}</p>
                  <p><strong>Data:</strong> {JSON.stringify(attestation.data)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="error-message">{queryResults.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryAttestationsPage;
