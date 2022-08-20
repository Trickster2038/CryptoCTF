import { Contract, Signer, ContractFactory } from "ethers";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers as ethers2 } from "ethers";

export const deployOrGetAt = async (
  contract: string,
  address: string,
  eoa: Signer,
  ...deployArgs: any[]
) => {
  
  console.log("network: " + hre.network.name)
  let factory: ContractFactory;
  factory = await hre.ethers.getContractFactory(contract, eoa);
  let c: Contract;
  c = await factory.attach(address).connect(eoa);
  return c;
};

/**
 * Gets a signer according to configured mnemonic on local hardhat network
 * Gets the signer corresponding to private key on ctf network
 */
export const getEoaOrPrivateKey = async (privateKey: string) => {

  console.log("Provider: " + ethers2.getDefaultProvider())
  const eoa = new ethers2.Wallet(privateKey, ethers2.getDefaultProvider());
  // ethers2.getDefaultProvider(ethers2.providers.getNetwork("ctf")));
  return eoa;
};
