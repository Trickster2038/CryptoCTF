// import dotenv from "dotenv";
// dotenv.config(); // load env vars from .env
import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const accounts = {
  // derive accounts from mnemonic, see tasks/create-key
  mnemonic: `test test test test test test test test test test test junk`,
};

const URL = `http://34.66.135.107:8545/7a01dd3b-2e84-4da2-9ec8-f87b355aaa0e`;

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
      { version: "0.8.15" },
    ],
  },
  networks: {
    ctf: {
      url: URL,
      accounts,
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