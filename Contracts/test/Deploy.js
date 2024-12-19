const { ethers } = require("hardhat");

async function main() {
  const loans = await ethers.getContractFactory("Loan");
  const Loan = await loans.deploy();
  console.log("MicroLoan deployed to:", Loan.target);
}
main()
.then(()=>console.log("Successful")).catch(err=>console.log("errr  ",  err))