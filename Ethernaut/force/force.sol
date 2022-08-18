// Transfer types: https://fravoll.github.io/solidity-patterns/secure_ether_transfer.html
// Force transfer with self-distruct: http://danielszego.blogspot.com/2018/03/solidity-security-patterns-forcing.html

pragma solidity ^0.6.0;

contract ForceBreaker {

    function recieve() external payable {}

    function forceTransfer(address payable reciever) public {
        selfdestruct(reciever);
    }

    fallback() external payable {}
}