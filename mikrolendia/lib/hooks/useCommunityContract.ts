import { useState, useEffect } from "react";
import { Contract, ethers, providers } from "ethers";
import { getCommunityContract } from "../contract/contract";

const useCommunity = (communityAddress: String) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [owners, setOwners] = useState<[String]|[]>([]);
  const [requiredSignatures, setRequiredSignatures] = useState(0);
  const [userAddress, setUserAddress] = useState<String | null>(null);
  const [provider, setProvider]=useState<ethers.providers.Web3Provider | null>(null)
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
  };
};

export default useCommunity;