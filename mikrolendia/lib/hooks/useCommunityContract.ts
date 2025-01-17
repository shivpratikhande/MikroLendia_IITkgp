import { useState, useEffect, useMemo, useCallback } from "react";
import { Contract, ethers, providers } from "ethers";
import { getCommunityContract } from "../contract/contract";

const useCommunity = (communityAddress: string) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [owners, setOwners] = useState<[String]|[]>([]);
  const [requiredSignatures, setRequiredSignatures] = useState(0);
  const [userAddress, setUserAddress] = useState<String | null>(null);
  const [provider, setProvider]=useState<ethers.providers.Web3Provider | null>(null)
  const [balance, setBalance]=useState<Number>(0)
  const [interestRate, setInterestRate]=useState<Number>(0)

  // Initialize provider and contract
  useEffect(() => {
    const initialize = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider)
        const signer = provider.getSigner();
        const address=await signer.getAddress()
        setUserAddress(address);
        const communityContract = getCommunityContract(provider, communityAddress)
        setContract(communityContract);
        
        // Fetch initial data
        const ownersList = await communityContract.getOwners();
        setOwners(ownersList);
        const requiredSigs = await communityContract.getRequiredSignatures();
        setRequiredSignatures(requiredSigs.toNumber());
      }
    };
    initialize();
  }, [communityAddress]);

  const fundCommunity = async (amount: Number) => {
    if (!contract) throw new Error("Contract is not initialized");
    const tx = await contract.fundme({ value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
  };

  const executeTransaction = async (to: String, value: String, signatures: [String]) => {
    if (!contract) throw new Error("Contract is not initialized");
    const tx = await contract.executeTransaction(to, ethers.utils.parseEther(value.toString()), signatures);
    await tx.wait();
  };

  const updateOwners = async (newOwners:[String], newRequiredSignatures:Number) => {
    if (!contract) throw new Error("Contract is not initialized");
    const tx = await contract.updateOwners(newOwners, newRequiredSignatures);
    await tx.wait();
  };

  const changeLoanContract = async (newAddress: String) => {
    if (!contract) throw new Error("Contract is not initialized");
    const tx = await contract.changeLoanContract(newAddress);
    await tx.wait();
  };

  const verifyOwner = async (address: String) => {
    if (!contract) throw new Error("Contract is not initialized");
    return await contract.isOwner(address);
  };
  const fetchBalance=useCallback(()=>{
    const getBalance=async()=>{
      if(communityAddress && provider){
        const bal=await provider?.getBalance(communityAddress);
        return setBalance(Number(bal))
      }
    }
    getBalance();
  }, [provider, communityAddress])

  const fetchInterest=useCallback(()=>{
    const getInterest=async()=>{
      if(!contract) throw new Error("Contract is not initialized");
      if(communityAddress && provider){
        const interest=await contract.getFixedInterestRate();
        return setInterestRate(Number(interest))
      }
    }
    getInterest();
  }, [provider, contract, communityAddress])
  const addSignatureToTransaction = async (to: String, value: Number) => {
    if (!userAddress) throw new Error("User address not detected");
    const messageHash = ethers.utils.solidityKeccak256(["address", "uint256", "string"], [to, ethers.utils.parseEther(value.toString()), ""]);
    const signer=await provider?.getSigner()
    const signature = await signer?.signMessage(messageHash)
    return signature;
  };

  return {
    contract,
    owners,
    requiredSignatures,
    userAddress,
    fundCommunity,
    executeTransaction,
    updateOwners,
    changeLoanContract,
    verifyOwner,
    addSignatureToTransaction,
    fetchBalance,
    fetchInterest,
    balance,
    interestRate,
    provider
  };
};

export default useCommunity;