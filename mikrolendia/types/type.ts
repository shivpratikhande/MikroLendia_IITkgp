export type Community = {
    id: number;
    name: string;
    description: string;
    funds: number;
    members: number;
    joined: boolean;
    interestRate: number;
  };
  
  export type LoanRequest = {
    id: number;
    title: string;
    amount: number;
    description: string;
    approvals: number;
    totalVotes: number;
    requestor: string;
    communityId: number;
  };
  