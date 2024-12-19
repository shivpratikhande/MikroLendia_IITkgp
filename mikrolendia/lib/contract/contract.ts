import { ethers } from 'ethers';
import LoanContractABI from './config/LoanContractABI.json';
import UserContractABI from './config/UserContractABI.json';

const loanContractAddress = process.env.VITE_LOAN_CONTRACT_ADDRESS!;
const userContractAddress = process.env.VITE_USER_CONTRACT_ADDRESS!;

export const getLoanContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(loanContractAddress, LoanContractABI, provider);
};

export const getUserContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(userContractAddress, UserContractABI, provider);
};
