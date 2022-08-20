// import dotenv from "dotenv";
// dotenv.config(); // load env vars from .env
import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const accounts2 = {
  // derive accounts from mnemonic, see tasks/create-key
  mnemonic: `test test test test test test test test test test test junk`,
};

const URL = `http://34.123.187.206:8545/a927442f-a311-43c6-b18e-13fae9189c38`;

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
      loggingEnabled: true,
      accounts: [`0x143988c8e6f559f99713a0777ce2bfa0e620f61eac8ca15dcfe6c31fc79af077`]
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