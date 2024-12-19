import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getLoanContract } from '../contract/contract';
import { toast } from 'sonner';
import { Loan, LoanType } from '@/types/type';


const useLoanContract = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [loanData, setLoanData] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creatingLoan, setCreatingLoan] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        console.log('Ethereum provider initialized');
      } else {
        toast.error('Please install MetaMask to interact with the blockchain.');
      }
    };

    initProvider();
  }, []);


  const fetchAllLoans = useCallback(async () => {
    if (!provider) return;
    console.log('yayay')
    setIsLoading(true);
    setError(null);

    try {
      const contract = getLoanContract(provider);
      console.log(contract)
      const loans = await contract.getAllLoans();
      console.log(loans)
      const loanCount=loans.length
      console.log(loanCount)
      console.log(loans)
      setLoanData(loans);
      console.log('Fetched all loans:', loans);
    } catch (err: unknown) {
      console.log(err)
      if (err instanceof Error) {
        console.error('Error fetching loans:', err.message);
        setError('Failed to fetch loan data');
      } else {
        console.error('Unknown error fetching loans', err);
        setError('An unexpected error occurred');
      }
      toast.error('An error occurred while fetching the loans.');
    } finally {
      setIsLoading(false);
    }
  }, [provider]);


  useEffect(() => {
    if (provider) {
      console.log("fetching")
      fetchAllLoans();
    }
  }, [fetchAllLoans, provider]); 


  const requestLoan = async (
    amount: number,
    description: string,
    loanType: LoanType,
    duration: number
  ): Promise<void> => {
    if (!provider) return;

    setCreatingLoan(true);

    const contract = getLoanContract(provider);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const tx = await contractWithSigner.requestLoan(amount, description, loanType, duration);
      console.log('Loan request transaction sent:', tx);
      await tx.wait();
      toast.success('Loan requested successfully.');
      fetchAllLoans();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error requesting loan:', err.message);
        toast.error('An error occurred while requesting the loan.');
      } else {
        console.error('Unknown error requesting loan:', err);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setCreatingLoan(false);
    }
  };

  // Approve a loan
  const approveLoan = async (
    loanId: number,
    interest: number,
    granter: string
  ): Promise<void> => {
    if (!provider) return;

    setIsLoading(true);

    const contract = getLoanContract(provider);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const tx = await contractWithSigner.approveLoan(loanId, interest, granter);
      console.log('Loan approval transaction sent:', tx);
      await tx.wait();
      toast.success('Loan approved successfully.');
      fetchAllLoans();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error approving loan:', err.message);
        toast.error('An error occurred while approving the loan.');
      } else {
        console.error('Unknown error approving loan:', err);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const repayLoan = async (loanId: number, amount: number): Promise<void> => {
    if (!provider) return;

    setIsLoading(true);

    const contract = getLoanContract(provider);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const tx = await contractWithSigner.repayLoan(loanId, {
        value: ethers.utils.parseUnits(amount.toString(), 'wei')
      });
      console.log('Repayment transaction sent:', tx);
      await tx.wait();
      toast.success('Loan repaid successfully.');
      fetchAllLoans();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error repaying loan:', err.message);
        toast.error('An error occurred while repaying the loan.');
      } else {
        console.error('Unknown error repaying loan:', err);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    provider,
    loanData,
    isLoading,
    creatingLoan,
    requestLoan,
    approveLoan,
    repayLoan,
    error,
  };
};

export default useLoanContract;
