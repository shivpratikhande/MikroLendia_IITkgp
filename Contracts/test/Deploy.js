const hre=require("hardhat")
async function main(){
    const user=await hre.ethers.getContractFactory("UserContract");
    const User=await user.deploy();
    console.log(User.target)
    const loan=await hre.ethers.getContractFactory("LoanContract");
    const Loan=await loan.deploy(User.target);
    console.log(Loan.target)
    const community=await hre.ethers.getContractFactory("Community");
    const Community=await community.deploy();
    console.log(Community.target)
    const factory=await hre.ethers.getContractFactory("CommunityFactory");
    const Factory=await factory.deploy(Community.target);
    console.log(Factory.target)
}
main().then(()=>console.log("Yay")).catch(err=>console.log(err))