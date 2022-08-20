import { Contract, Signer } from "ethers";
// import { ethers } from "hardhat";
// import "@nomiclabs/hardhat-ethers";
import { deployOrGetAt, getEoaOrPrivateKey } from "./utils";
// import { ethers } from "ethers";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";

let accounts: Signer[];
let eoa: Signer;
let eoaAddress: string;
let attacker: Contract;
let setup: Contract; // setup contract
let tx: any;

before(async () => {
    eoa = await getEoaOrPrivateKey(
        `0x0273251ed31bde0129bfd49aac934a04ee8ac4822b570b7cd9f492a30b5e2b79`
    );
    eoaAddress = await eoa.getAddress();
    console.log(eoaAddress)

      setup = await deployOrGetAt(
        `contracts/random/contracts/Setup.sol:Setup`,
        `0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`,
        eoa,
        { /*value: hre.ethers.utils.parseEther(`100`)*/ }
      );
    // const { ethers33 } = require("hardhat");

    // setup = await ethers33.getContractAt("Setup", `0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`, eoa);


    // setup = new ethers.Contract(`0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`,
    // `contracts/random/contracts/Setup.sol:Setup`,
    // eoa)
});

it("solves the challenge", async function () {
    console.log("test placeholder")
});