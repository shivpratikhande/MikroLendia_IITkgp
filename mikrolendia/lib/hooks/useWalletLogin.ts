import { useAppDispatch } from '../hooks/useAppDispatch';
import { setWalletAddress, disconnectWallet } from '../store/wallet/walletSlice';

export const useWalletLogin = () => {
  const dispatch = useAppDispatch(); 

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
          dispatch(setWalletAddress(accounts[0]));
        } else {
          console.error('No accounts found in MetaMask');
        }
      } catch (error: unknown) {
        console.error('Error connecting to MetaMask:', error);
        alert('Could not connect to MetaMask. Please try again.');
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask!');
    }
  };

  const disconnectWalletHandler = () => {
    dispatch(disconnectWallet());
  };

  return { connectWallet, disconnectWalletHandler };
};
