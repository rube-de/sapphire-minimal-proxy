import { ethers } from "hardhat";

async function main() {

  const erc20impl = await ethers.deployContract("ERC20Impl");
  console.log(`ERC20 Impl deployed to ${erc20impl.target}`);
  const cloneFactory = await ethers.deployContract("ERC20CloneFactory", [erc20impl.target]);
  await cloneFactory.waitForDeployment();
  console.log(`Clone factory deployed to ${cloneFactory.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});