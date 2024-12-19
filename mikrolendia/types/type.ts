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

  export enum LoanType {
    personal = 0,
    business = 1,
    student = 2,
  }
  
  enum Status {
    pending = 0,
    accepted = 1,
    completed = 2,
    cancelled = 3,
  }
  
  

  export interface Loan {
    typeOfLoan: number;
    amount: number;
    description: string;
    loanType: LoanType;
    status: Status;
    requester: string;
    granter: string;
    interest: number;
    dueDate: number;
    amountPaid: number;
    duration: number;
  }