import { Contract, Signer, ContractFactory } from "ethers";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers as ethers2 } from "ethers";

/**
 * Deploys on local hardhat network.
 * Attaches to an existing contract on ctf network
 */
export const deployOrGetAt = async (
  contract: string,
  address: string,
  eoa: Signer,
  ...deployArgs: any[]
) => {
  console.log(hre.network.name)
  let factory: ContractFactory;
  // const {ethers} = hre;
  // factory = await hre.ethers.getContractFactory(contract, eoa);
  factory = await hre.ethers.getContractFactory(contract, eoa);
  let c: Contract;
  // if (hre.network.name === `hardhat`) {
  //   c = await factory.deploy(...deployArgs);
  // } else {
  c = await factory.attach(address).connect(eoa);
  // c = await factory.attach(address).connect(ethers.getDefaultProvider(ethers.providers.getNetwork("ctf")))
  // }
  // let c=0; 
  // const c = new hre.ethers.Contract(`0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`,
  //   `contracts/random/contracts/Setup.sol:Setup`,
  //   eoa)

  return c;
};

/**
 * Gets a signer according to configured mnemonic on local hardhat network
 * Gets the signer corresponding to private key on ctf network
 */
export const getEoaOrPrivateKey = async (privateKey: string) => {
  // if (hre.network.name === `hardhat`) {
  //   const [eoa] = await ethers.getSigners();
  //   return eoa;
  // } else {
    console.log("Provider: " + ethers2.getDefaultProvider())
    const eoa = new ethers2.Wallet(privateKey, ethers2.getDefaultProvider());
      // ethers2.getDefaultProvider(ethers2.providers.getNetwork("ctf")));

    return eoa;
  // }
};
