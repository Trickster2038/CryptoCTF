// import dotenv from "dotenv";
// dotenv.config(); // load env vars from .env
import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const accounts2 = {
  // derive accounts from mnemonic, see tasks/create-key
  mnemonic: `test test test test test test test test test test test junk`,
};

const URL = `http://34.123.187.206:8545/ecd85bbc-95bd-4873-b8ec-c2a716df555e`;

// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.4.24" },
      { version: "0.4.16" },
      { version: "0.5.12" },
      { version: "0.6.0" },
      { version: "0.6.12" },
      { version: "0.7.0" },
      { version: "0.8.0" },
      { version: "0.8.7" },
      { version: "0.8.15" },
      { version: "0.8.16" },
    ],
  },
  networks: {
    ctf: {
      url: URL,
      accounts: [`0x2ab02d753c07d5194bb4eccde74ce308c9e8ea00104e70ba975d4250d4141f98`]
    },
    // hardhat: {
    //   accounts,
    //   loggingEnabled: false,
    //   forking: {
    //     url: ARCHIVE_URL, // https://eth-mainnet.alchemyapi.io/v2/SECRET`,
    //     blockNumber: 11800000
    //   },
    // },
    local: {
      url: "http://127.0.0.1:8545",
    },
  },
  mocha: {
    timeout: 300 * 1e3,
  },
  defaultNetwork: "ctf"
};

export default config;