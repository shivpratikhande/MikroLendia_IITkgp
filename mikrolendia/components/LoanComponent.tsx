import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner'; // Toast library for displaying messages
import { useCheckContract } from '@/lib/hooks/useCheckContract';


const LoanComponent = () => {
  const [contractAddress, setContractAddress] = useState('0x6431B8fd82FFb9e0F45566b62efF9a9fFeb31866');
  const { isConnected, error } = useCheckContract(contractAddress); // Use the hook to check contract connection

  useEffect(() => {
    if (isConnected) {
      toast.success('Contract connected successfully!');
    } else if (error) {
      toast.error(error);
    }
  }, [isConnected, error]);

  return (
    <div>
      <h1>Loan Application</h1>
      {isConnected ? (
        <div>Contract is connected. You can proceed with loan requests and approvals.</div>
      ) : (
        <div>Waiting for contract connection...</div>
      )}
    </div>
  );
};

export default LoanComponent;
