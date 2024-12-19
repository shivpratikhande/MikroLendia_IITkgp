import { ethers } from 'ethers';
import LoanContractABI from './config/LoanContractABI.json';
import UserContractABI from './config/UserContractABI.json';
import CommunityABI from "./config/CommunityAbi.json"
import CommunityFactoryABI from "./config/communityFactoryABI.json"
const loanContractAddress = "0xEB5155a36FF6C90394b9fc8Fb6f8E6A84c318Cd1";
const userContractAddress = "0x6431B8fd82FFb9e0F45566b62efF9a9fFeb31866";
const communityFactoryAddress="0x24E3B123e4b99e05e6762417819Bf032fff37B46";

export const getLoanContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(loanContractAddress, LoanContractABI, provider);
};

export const getUserContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(userContractAddress, UserContractABI, provider);
};

export const getCommunityFactoryContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(communityFactoryAddress, CommunityFactoryABI, provider);
};

export const getCommunityContract = (provider: ethers.providers.Provider, communityAddress: string) => {
  return new ethers.Contract(communityAddress, CommunityABI, provider);
};