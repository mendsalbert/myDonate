const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;

  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  await donation.deployed();

  txHash = donation.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let donationAddress = txReceipt.contractAddress;

  console.log("donation contract address", donationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
