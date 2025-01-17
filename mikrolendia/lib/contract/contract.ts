import { ethers } from 'ethers';
import LoanContractABI from './config/LoanContractABI.json';
import UserContractABI from './config/UserContractABI.json';
import CommunityABI from "./config/CommunityAbi.json"
import CommunityFactoryABI from "./config/communityFactoryABI.json"
const loanContractAddress = "0x2D10b9CdCe6068A30cbDf7fa212501d2E58C8aB3";
const userContractAddress = "0x026d79051961A985A1b663DFf7B37aDB8D21C80f";
const communityFactoryAddress="0x0AF18527d6CdAB05EE5499fB599eB8a7a6b30e19";
export const getLoanContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(loanContractAddress, LoanContractABI, provider);
};

export const getUserContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(userContractAddress, UserContractABI, provider);
};

export const getCommunityFactoryContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(communityFactoryAddress, CommunityFactoryABI, provider);
};

export const getCommunityContract = (provider: ethers.providers.Provider, communityAddress: String) => {
  return new ethers.Contract(communityAddress, CommunityABI, provider);
};