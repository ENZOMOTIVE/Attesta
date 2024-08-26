import React from 'react';

function LoginPage({ onLogin }) {
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        // Call the onLogin function with the wallet address
        onLogin(walletAddress);
      } catch (error) {
        console.error("User denied account access or there was an error connecting the wallet", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div>
      <h1>Login or Connect Your Wallet</h1>
      <button onClick={handleConnectWallet}>Connect Wallet</button>
    </div>
  );
}

export default LoginPage;