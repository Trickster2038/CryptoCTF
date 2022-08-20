import { Contract, Signer } from "ethers";
// import { ethers } from "hardhat";
// import "@nomiclabs/hardhat-ethers";
import { deployOrGetAt, getEoaOrPrivateKey } from "./utils";
import { ethers } from "ethers";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let eoaAddress: string;
let attacker: Contract;
let setup: Contract; // setup contract
let tx: any;

before(async () => {
    eoa = await getEoaOrPrivateKey(
        `0x2701e939edfc60fa51ce9d6c87d298fe5bb637782594845fb5008b3160822130`
    );
    eoaAddress = await eoa.getAddress();
    console.log(eoaAddress)

    setup = await hre.ethers.getContractAt("Setup" , "0x536989F303a5196500a901fCA32FfA1b0857891f");

    //   setup = await deployOrGetAt(
    //     `contracts/random/contracts/Setup.sol:Setup`,
    //     `0x536989F303a5196500a901fCA32FfA1b0857891f`,
    //     eoa,
    //     // { /*value: hre.ethers.utils.parseEther(`100`)*/ }
    //   );
    // const { ethers33 } = require("hardhat");

    // setup = await ethers33.getContractAt("Setup", `0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`, eoa);


    // setup = new ethers.Contract(`0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`,
    // `contracts/random/contracts/Setup.sol:Setup`,
    // eoa)
});

it("solves the challenge", async function () {

    // const hello = await hre.ethers.getContractAt(`contracts/random/contracts/Setup.sol:Setup`,
    // `0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`);

    console.log("test placeholder")
    // console.log(setup.interface)
    // tx = await setup.isSolved({})
    // await tx.wait()
    console.log("solved y/n: " + await setup.isSolved());

    const random_contract = await hre.ethers.getContractAt("Random", await setup.random());
    await random_contract.solve(4)
    console.log("solved y/n: " + await setup.isSolved());

    // const solved = await setup.isSolved();
    // expect(solved).to.be.false;
    // this.state.signer.provider.getCode(`0x188D710fe605B60b9C5FF0bBBd19Ad1a205e17D2`)
});