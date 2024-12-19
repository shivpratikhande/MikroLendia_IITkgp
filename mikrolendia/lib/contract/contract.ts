import { ethers } from 'ethers';
import LoanContractABI from './config/LoanContractABI.json';
import UserContractABI from './config/UserContractABI.json';
import * as dotenv from "dotenv"
dotenv.config()
console.log(process.env)
const loanContractAddress = "0xEB5155a36FF6C90394b9fc8Fb6f8E6A84c318Cd1";
const userContractAddress = "0x6431B8fd82FFb9e0F45566b62efF9a9fFeb31866";
export const getLoanContract = (provider: ethers.providers.Provider) => {
  const contract: any=new ethers.Contract(loanContractAddress, LoanContractABI, provider);
  return contract
};

export const getUserContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(userContractAddress, UserContractABI, provider);
};
