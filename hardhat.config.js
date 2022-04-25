/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync("secret.txt").toString();
const projectId = "8b7ba5517c414450a93ec7334975a7fe";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    //  unused configuration commented out for now
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      // url: "https://goerli.infura.io/v3/8b7ba5517c414450a93ec7334975a7fe",
      accounts: [privateKey],
    },
    mainet: {
      url: `https://palm-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
