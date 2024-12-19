// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Loan {
    uint256 totalUsers = 0;
    uint256 totalLoans = 0;

    struct User {
        uint256 userId;
        string name;
        uint256 age;
        string city;
        string profession;
        address userAddress;
        uint256 strikes;
        string phone;
    }

    enum LoanType {personal, business, student}
    enum Status {pending, accepted, completed, cancelled}

    struct LoanStruct {
        uint256 loanId;
        uint256 amount;
        string description;
        LoanType typeOfLoan;
        Status status;
        address requester;
        address granter;
        uint256 interest;
        uint256 dueDate; // timestamp of the next due date
        uint256 amountPaid; // total amount paid so far
        uint256 duration;   
        uint256 amountDueNextMonth;
        uint256 lastPaidDate;   
    }

    mapping(address => User) public Users;
    mapping(uint256 => LoanStruct) public Loans;
    mapping(address => LoanStruct[]) public UserRequestedLoans;
    mapping(address => LoanStruct[]) public UserApprovedLoans;
    mapping(address => LoanStruct[]) public UserPaidLoans;

    
    function addUser(string memory _name, uint256 _age, string memory _city, string memory _profession, string memory _phone) public {
        require(Users[msg.sender].userAddress != msg.sender, "User Already registered");
        User memory newUser = User(totalUsers, _name, _age, _city, _profession, msg.sender, 0, _phone);
        Users[msg.sender] = newUser;
        totalUsers++;
    }

    function calculateAmountDueNextMonth(uint256 _loanId) internal {
        LoanStruct storage loan = Loans[_loanId];
        uint256 principalDueNextMonth = loan.amount / loan.duration;
        uint256 remainingAmount = loan.amount - loan.amountPaid;
        uint256 interestDueNextMonth = (remainingAmount * loan.interest) / 100;
        loan.amountDueNextMonth = principalDueNextMonth + interestDueNextMonth;
    }
    function requestLoan(uint256 _amount, string memory _description, LoanType _type, uint256 _duration) public {
        require(Users[msg.sender].userAddress == msg.sender, "User not registered");
        LoanStruct memory temp = LoanStruct(totalLoans, _amount, _description, _type, Status.pending, msg.sender, address(0), 0, 0, 0, _duration, 0,0);
        calculateAmountDueNextMonth(totalLoans);
        Loans[totalLoans] = temp;
        UserRequestedLoans[msg.sender].push(temp);
        totalLoans++;
    }



    function approveLoan(uint256 _loanId, uint256 _interest, address _granter) public payable {
        require(Users[msg.sender].userAddress == msg.sender, "User not registered");
        require(Loans[_loanId].status == Status.pending, "Loan is not pending");
        LoanStruct storage loan = Loans[_loanId];
        loan.status = Status.accepted;
        loan.granter = _granter;
        loan.interest = _interest;
        loan.dueDate = block.timestamp + 30 days; 
        bool success = payable(loan.requester).send(loan.amount);
        require(success, "Payment Failed");
        UserApprovedLoans[msg.sender].push(loan);
        UserPaidLoans[_granter].push(loan);

        LoanStruct[] memory temp = new LoanStruct[](UserRequestedLoans[loan.requester].length - 1);
        uint256 j = 0;
        for (uint256 i = 0; i < UserRequestedLoans[loan.requester].length; i++) {
            if (UserRequestedLoans[loan.requester][i].loanId != _loanId) {
                temp[j] = UserRequestedLoans[loan.requester][i];
                j++;
            }
        }
        delete UserRequestedLoans[loan.requester];
        for (uint256 i = 0; i < j; i++) {
            UserRequestedLoans[loan.requester].push(temp[i]);
        }
    }

    function repayLoan(uint256 _loanId) public payable {
        LoanStruct storage loan = Loans[_loanId];
        require(loan.requester == msg.sender, "You are not the requester of this loan");
        require(loan.status == Status.accepted, "Loan is not active");
        uint256 timeElapsed = block.timestamp - loan.lastPaidDate; 
        uint256 monthsElapsed = timeElapsed / 30 days; 
        require(monthsElapsed > 0, "Repayment can only be made once a month");
        calculateAmountDueNextMonth(_loanId);
        require(msg.value >= loan.amountDueNextMonth, "Incorrect repayment amount");
        (bool success, ) = payable(loan.granter).call{value: msg.value}("");
        require(success, "Payment failed");
        loan.amountPaid += msg.value;
        if (loan.amountPaid >= loan.amount) {
            loan.status = Status.completed;
        }
        loan.lastPaidDate = block.timestamp;
        calculateAmountDueNextMonth(_loanId);
    }

    function addStrikeIfLate(uint256 _loanId) public {
        LoanStruct storage loan = Loans[_loanId];
        require(loan.status == Status.accepted, "Loan is not active");
        if(block.timestamp > loan.dueDate){
            Users[loan.requester].strikes++;
            loan.dueDate += 30 days;
        }
    }
    function getAllLoans() public view returns (LoanStruct[] memory) {
        LoanStruct[] memory allLoans = new LoanStruct[](totalLoans);
        for (uint256 i = 0; i < totalLoans; i++) {
            allLoans[i] = Loans[i];
        }
        return allLoans;
    }

    function getUserRequestedLoans(address _user) public view returns (LoanStruct[] memory) {
        return UserRequestedLoans[_user];
    }

    function getUserApprovedLoans(address _user) public view returns (LoanStruct[] memory) {
        return UserApprovedLoans[_user];
    }

    function getUserPaidLoans(address _user) public view returns (LoanStruct[] memory) {
        return UserPaidLoans[_user];
    }
}
