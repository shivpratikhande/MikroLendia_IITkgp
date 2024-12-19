// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UserContract {
    uint256 totalUsers = 0;

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

    mapping(address => User) public Users;

    event UserRegistered(address indexed userAddress, string name);

    function addUser(string memory _name, uint256 _age, string memory _city, string memory _profession, string memory _phone) public {
        require(Users[msg.sender].userAddress != msg.sender, "User Already registered");
        
        Users[msg.sender] = User(totalUsers, _name, _age, _city, _profession, msg.sender, 0, _phone);
        emit UserRegistered(msg.sender, _name);
        totalUsers++;
    }

    function getUser(address _user) public view returns (User memory) {
        return Users[_user];
    }

    function addStrike(address _user) public {
        Users[_user].strikes++;
    }
}
