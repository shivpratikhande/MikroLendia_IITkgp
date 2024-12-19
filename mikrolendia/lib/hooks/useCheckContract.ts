import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import LoanContractABI from '../contract/config/LoanContractABI.json';

export const useCheckContract = (contractAddress: string) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loans, setLoans] = useState<any[]>([]);  // To store loans fetched from the contract

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        try {
          // Initialize the contract instance
          const contractInstance = new ethers.Contract(contractAddress, LoanContractABI, web3Provider);
          setContract(contractInstance);

          // Check if the contract is connected and functional
          const isConnected = await checkContractConnection(web3Provider, contractInstance);
          setIsConnected(isConnected);
        } catch (err) {
          setError('Error initializing contract');
          console.error('Error initializing contract:', err);
        }
      } else {
        setError('Please install MetaMask or another Ethereum wallet.');
      }
    };

    init();
  }, [contractAddress]);

  // Check provider connection and contract interaction
  const checkContractConnection = async (
    provider: ethers.providers.Web3Provider,
    contract: ethers.Contract
  ) => {
    try {
      console.log('Attempting to call getAllLoans...');
      // Fetch all loans to check if the contract is functional
      const allLoans = await contract.getAllLoans(); // Ensure this function exists and returns loans
      console.log('Fetched all loans:', allLoans);

      setLoans(allLoans);  // Store the loans in state for further use (optional)

      return true;  // Contract is connected and functional
    } catch (error) {
      console.error('Contract connection failed:', error);

      if (error && error.data && error.data.message) {
        setError(`Contract call failed: ${error.data.message}`);
      } else {
        setError('Unknown contract error');
      }

      return false;  // Contract is not connected
    }
  };

  return { isConnected, error, loans };
};
