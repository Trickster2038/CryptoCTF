import { Contract, Signer } from "ethers";
import { deployOrGetAt, getEoaOrPrivateKey } from "./utils";
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
});

it("solves the challenge", async function () {

    console.log("solved y/n: " + await setup.isSolved());
    const random_contract = await hre.ethers.getContractAt("Random", await setup.random());
    await random_contract.solve(4)
    console.log("solved y/n: " + await setup.isSolved());
});