pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    RWD public rwd;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    address[] public stakers;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint256 _amount) public {
        //staking amount cannot be zero
        require(_amount > 0, "amount cannot be 0");
        // transfer Tether token to this contact address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update stating Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking balance

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstake tokens
    function unstakeToken() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be less than o");

        tether.transfer(msg.sender, balance);

        //reset staking balance
        stakingBalance[msg.sender] = 0;

        //update staking status
        isStaking[msg.sender] = false;
    }

    //issue token
    function issueTokens() public {
        require(msg.sender == owner, "caller must be the owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;

            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
